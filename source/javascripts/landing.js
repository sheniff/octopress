$(document).ready(function(){

  var presentation = {

    showTiles: function(){
      var tiles = $('.loading'), i;
      for(i = 0; i < tiles.length; i++)
        $(tiles[i]).addClass('delay'+Math.ceil(Math.random()*4));
      tiles.removeClass('loading');
      return true;
    },

    loadSelect: function(){
      $('#content').on('click', '.tile', function(e){
        e.preventDefault();
        $(e.currentTarget).toggleClass('selected');
      })
    }

  }

  // Init
  presentation.showTiles();
  presentation.loadSelect();
});
