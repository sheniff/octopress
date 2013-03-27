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
      this.enableSelection();
      return true;
    },

    enableSelection: function(){
      var self = this;
      this.$container.on('click', '.tile.interactive', function(e){
        e.preventDefault();

        var $target = $(e.currentTarget),
            transitionEnd = self.whichTransitionEvent();

        $target.addEventListener(transitionEnd, function() {
          self.showTheBlock($target);
        }, false);

        $target.removeClass('delay1 delay2 delay3 delay4').addClass('selected');
      })
    },

    whichTransitionEvent: function(){
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
    },

    showTheBlock: function($ref) {
      var $theblock = $('#the_block');

      $theblock.height($ref.height());
      $theblock.width($ref.width());
      $theblock.offset($ref.offset());

      $theblock.removeClass('hidden');
    }

  }

  // Init
  tiles.show();
  tiles.enableSelection();
});
