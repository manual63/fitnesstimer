var Global = {
  functions:  {
    clearView : function() {
      $('#content').html('');
    },
    highlightNav: function(navObj) {
      $('nav ul li a').removeClass('active');
      $(navObj).addClass('active');
    },
    getTemplate: function( template ) {
        var html = null;
        $.ajax({
            type: "GET",
            url: 'templates/' + template,
            async: false,
            cache: false
        }).done( function( data ) {
            html = data;
        });
        return html;
    }
  }
};

var homeTemplate = null;
$(function() {
  var source   = Global.functions.getTemplate( 'home.html' );
  homeTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'timer.html' );
  timerTemplate = Handlebars.compile( source );
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();
