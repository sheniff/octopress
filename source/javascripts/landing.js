var whichTransitionEvent = function(){
  var t, el = document.createElement('fakeelement'),
      transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
      };

  for(t in transitions)
    if( el.style[t] !== undefined )
      return transitions[t];
};

$(document).ready(function(){

  var tiles = {
    $container: $('#content'),
    $tiles: $('#content .tile'),

    start: function() {
      this.show();
    },

    show: function(){
      var tiles = $('.loading'), i;
      for(i = 0; i < tiles.length; i++)
        $(tiles[i]).addClass('delay'+Math.ceil(Math.random()*4));
      tiles.removeClass('loading');
      return true;
    },

    selectCb: function(e){
      e.preventDefault();
      e.stopPropagation();

      var $el = $(this);

      theBlock.place($el);
      theBlock.context = ($el.attr('id'));

      $el
        .removeClass('delay1 delay2 delay3 delay4')
        .addClass('selected');

      theBlock.show();
    },

    enableSelection: function(){
      var self = this;

      this.$container.off('click').on('click', '.tile.interactive', this.selectCb);
    }
  };

/////////

  var theBlock = {
    block: $('#the_block'),
    context: null,

    place: function($ref) {
      var bg_regex = /(bg-.*)\s*$/,
          new_bg_class = $ref.find('.veil').attr('class').match(bg_regex) && $ref.find('.veil').attr('class').match(bg_regex)[1],
          old_bg_class = this.block.attr('class').match(bg_regex) && this.block.attr('class').match(bg_regex)[1];

      if(old_bg_class && old_bg_class.length)
        this.block.removeClass(old_bg_class);

      this.block
        .height($ref.height())
        .width($ref.width())
        .addClass(new_bg_class)
        .offset($ref.offset());
    },

    show: function() {
      var self = this;
      this.block.one(whichTransitionEvent(), function() {
        self.block.addClass('growing');
        self.expand();
      });

      this.block.removeClass('hidden');
    },

    hide: function() {
      this.block.addClass('hidden');
    },

    expand: function($block) {
      this.block
        .one(whichTransitionEvent(), $.proxy(function() {
          this.block.removeClass('growing');
          this.printPage();
        },this))
        .css({ top: 10, left: 0 })
        .width('100%')
        .height(570);
    },

    printPage: function() {
      console.log('using', this.context);
      page.load(
        this.context+'.html',
        $.proxy(function(data) {
          // this.block.html($(data).find('article').html());
          console.log("gotcha!", $.type(data), data.match(/\<article.*\>.*\<\/article\>/));
        },this),
        function(xhr) {
          alert('something went wrong...(temporary annoying answer xD)');
        }
      );
    }
  };

  page = {
    cache: {},
    load: function(url, success, error) {
      if(this.cache[url])
        success(this.cache[url]);
      else {

        var self = this;
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'html',
          data: {},
          success: function(data, textStatus, xhr) {
            self.cache[url] = data;
            success(data);
          },
          error: error
        });

      }
    }
  }

  // Init
  tiles.show();
  tiles.enableSelection();
});
