$(document).ready(function(){

  var easter = {
    courtain: $('#easter_courtain'),

    launch: function() {
      if(!easter.courtain.length)
        easter.courtain = $('<div id="easter_courtain" class="courtain hidden"><div id="easter_q">?</div></div>').appendTo('#content');

      easter.courtain.removeClass('hidden');

      Mousetrap.bind('m', function(){

        $('#easter_q').text('M!');
        Mousetrap.unbind('m');

        window.setTimeout(function() {
          easter.courtain.addClass('hidden');
          $('#easter_q').text('?');
          Memory.generate();
        }, 500);
      });
    }
  };

  Memory = {
    generate: function() {
      var $board = $('<div id="easter_board" class="hidden">'),
          $container = $('#content'),
          i;


      for(i = 0; i < 16; i++){
        $board.append('<div class="tile back"><div class="face hidden"></div></div>');
      };
      $container
        .append($board)
        .one(whichTransitionEvent(), $.proxy(function() {
          $board.removeClass('hidden');
          $container.removeClass('rotate');
        },this));

      $container.addClass('rotate');
    }
  };

  // Mousetrap.bind('up up down down left right left right b a enter', easter.launch);
  Mousetrap.bind('a s d', easter.launch);

});
