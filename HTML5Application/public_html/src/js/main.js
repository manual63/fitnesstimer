var Global = {
  functions:  {
    clearView : function() {
      $('#content').html('');
    },
    highlightNav: function(navObj) {
      $('nav ul li a').removeClass('active');
      $(navObj).addClass('active');
    }
  }
};

var homeTemplate = null;
$(function() {
  var source   = $("#home-template").html();
   homeTemplate = Handlebars.compile(source);

  var source   = $("#timer-template").html();
   timerTemplate = Handlebars.compile(source);
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();
