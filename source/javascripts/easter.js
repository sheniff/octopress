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
          easter.memory();
        }, 500);
      });
    },

    memory: function() {
      $('.tile').each(function(i,e) {
        var card = $('<div class="card hidden"></div>');
        $(e).append(card);
      });
      $('#content').off('click').on('click', '.tile', easter.rotate);
    },

    rotate: function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget),
          $card = $target.find('.card');

      $target
        .addClass('selected')
        .one(whichTransitionEvent(), function() {
          $card.removeClass('hidden');
          $target.removeClass('selected');
        });
    }
  };

  // Mousetrap.bind('up up down down left right left right b a enter', easter.launch);
  Mousetrap.bind('a s d', easter.launch);

});
