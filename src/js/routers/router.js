var AppRouter = Backbone.Router.extend({ 
  routes: { 
    "timer*params": "timerView",
    "register*params": "registerView",
    "users*params": "usersView",
    "user*params": "userView",
    "login*params": "loginView",
    "welcome*params": "welcomeView",
    "logout": "endSession",
    "createclass*params": "createClassView",
    "getclasses*params": "getClassesView",
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
  registerView: function(params) {
    Global.functions.clearView();
    var register = new Register();
    register.fetch({
      success: function (register) {
        var view = new RegisterView();
        view.render(register);
      }
    }); 
  },
  usersView: function(params) {
    Global.functions.clearView();
    var users = new Users();
    users.fetch({
      success: function (users) {
        var view = new UsersView();
        view.render(users);
      }
    });
  },
  userView: function(params) {
    Global.functions.clearView();
    var user = new User();
    user.fetch({
      success: function (user) {
        var view = new UserView();
        view.render(user);
      }
    });
  },
  loginView: function(params) {
    Global.functions.clearView();
    if($.cookie( 'userId' )) {
      app_router.navigate('welcome', {trigger:true});
    } else {
      var login = new Login();
      login.fetch({
        success: function (login) {
          var view = new LoginView();
          view.render(login);
        }
      });     
    }
  },
  welcomeView: function(params) {
    Global.functions.clearView();
    var user = new User();
    user.fetch({
      success: function (user) {
        var view = new WelcomeView();
        view.render(user);
      }
    });
  },
  endSession: function() {
    $.removeCookie("userId");
    app_router.navigate('home', {trigger:true});
  },
  createClassView: function(params) {
    Global.functions.clearView();
    var fitnessClass = new FitnessClass();
    fitnessClass.fetch({
      success: function (fitnessClass) {
        var view = new CreateClassView();
        view.render(fitnessClass);
      }
    });
  },
  getClassesView: function(params) {
    Global.functions.clearView();
    var fitnessClasses = new FitnessClasses();
    fitnessClasses.fetch({
      success: function (fitnessClasses) {
        var view = new GetClassesView();
        view.render(fitnessClasses);
      }
    });
  },
  getMovesView: function(params) {
    Global.functions.clearView();
    var moves = new Moves();
    moves.fetch({
      success: function (moves) {
        var view = new GetMovesView();
        view.render(moves);
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