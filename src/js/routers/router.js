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
    "getmoves*params": "getMovesView",
    "*params":"homeView"
  },
  timerView: function(params) {
    Global.functions.clearView();
    var timer = new Timer();
    timer.fetch({
      success: function (timer) {
        var timerView = new TimerView();
        timerView.render(timer);
      }
    });	
  },
  registerView: function(params) {
    Global.functions.clearView();
    var register = new Register();
    register.fetch({
      success: function (register) {
        var registerView = new RegisterView();
        registerView.render(register);
      }
    }); 
  },
  usersView: function(params) {
    Global.functions.clearView();
    var users = new Users();
    users.fetch({
      success: function (users) {
        var usersView = new UsersView();
        usersView.render(users);
      }
    });
  },
  userView: function(params) {
    Global.functions.clearView();
    var user = new User();
    user.fetch({
      success: function (user) {
        var userView = new UserView();
        userView.render(user);
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
          var loginView = new LoginView();
          loginView.render(login);
        }
      });     
    }
  },
  welcomeView: function(params) {
    Global.functions.clearView();
    var user = new User();
    user.fetch({
      success: function (user) {
        var welcomeView = new WelcomeView();
        welcomeView.render(user);
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
        var createClassView = new CreateClassView();
        createClassView.render(fitnessClass);
      }
    });
  },
  getClassesView: function(params) {
    Global.functions.clearView();
    var fitnessClasses = new FitnessClasses();
    fitnessClasses.fetch({
      success: function (fitnessClasses) {
        var getClassView = new GetClassesView();
        getClassView.render(fitnessClasses);
      }
    });
  },
  getMovesView: function(params) {
    Global.functions.clearView();
    var moves = new Moves();
    moves.fetch({
      success: function (moves) {
        var movesView = new MovesView();
        movesView.render(moves);
      }
    });
  },
  homeView: function(params) {
    Global.functions.clearView();
    var home = new Home();
    home.fetch({
      success: function (home) {
        var homeView = new HomeView();
        homeView.render(home);
      }
    });	   
  }
});