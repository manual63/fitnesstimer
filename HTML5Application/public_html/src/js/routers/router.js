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