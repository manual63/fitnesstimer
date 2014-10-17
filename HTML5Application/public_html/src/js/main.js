var AppRouter = Backbone.Router.extend({ 
  routes: { 
    "timer*params": "timerView",
    "*params":"homeView"
    
  },
  timerView: function(params) {
    Global.functions.clearView();
    var timer = new Timer();
    timer.fetch({
      success: function (timer) {
        var view = new TimerView();
        view.render(timer);
      }
    });	
  },
  homeView: function(params) {
    Global.functions.clearView();
    var home = new Home();
    home.fetch({
      success: function (home) {
        var view = new HomeView();
        view.render(home);
      }
    });	   
  }
});



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

var classFormat = null;

if( classFormat === null ) {
    //Do AJAX call to get format data for display and some text
    classFormat = {};
}

$(function() {
  $( '.start-pretimer' ).on( 'click', function() {
    fitnesstimer.preTimer();
  });

  $( '.stop-timer' ).on( 'click', function() {
    fitnesstimer.stopTimer();
  });

  //fitnesstimer.getClassFormat();

  $( '#classFormat' ).on( 'change', function() {
    fitnesstimer.getClassFormat();
  });
});