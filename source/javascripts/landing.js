$(document).ready(function(){

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

    enableSelection: function(){
      var self = this;

      this.$container.on('click', '.tile.interactive', function(e){
        e.preventDefault();
        e.stopPropagation();

        var $el = $(this);

        theBlock.place($el);

        $el
          .removeClass('delay1 delay2 delay3 delay4')
          .addClass('selected');

        theBlock.show();
      });
    }
  };

/////////

  var theBlock = {
    block: $('#the_block'),

    place: function($ref) {
      this.block
        .height($ref.height())
        .width($ref.width())
        .offset($ref.offset())
        .addClass('growing');
    },

    show: function() {
      var self = this;
      this.block.one(whichTransitionEvent(), function() {
        self.expand();
      });

      this.block.removeClass('hidden');
    },

    hide: function() {
      this.block.addClass('hidden');
    },

    expand: function($block) {
      this.block
        .offset({
          top: 0,
          left: 0
        })
        .width(760)
        .height(570);
    }

  };

  // Init
  tiles.show();
  tiles.enableSelection();
});
