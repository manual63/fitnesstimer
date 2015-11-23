var Home = Backbone.Model.extend({
  urlRoot: 'data/home.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
  }
});


var Register = Backbone.Model.extend({
  urlRoot: 'data/register.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
  }
});
var Timer = Backbone.Model.extend({
  urlRoot: 'data/timer.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
      
  }
});



var AppRouter = Backbone.Router.extend({ 
  routes: { 
    "timer*params": "timerView",
    "register*params": "registerView",
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
var HomeView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #timerView": "goToTimer"
    },
    render: function (home){
        var html = homeTemplate(home.toJSON());
        this.$el.html(html);
    },
    goToTimer: function() {
        app_router.navigate('timer', {trigger:true});
    }
});
var RegisterView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #createUser": "createUser"
    },
    render: function (home){
        var html = registerTemplate(register.toJSON());
        this.$el.html(html);
    },
    createUser: function() {
        //app_router.navigate('timer', {trigger:true});
    }
});
var TimerView = Backbone.View.extend({
    startTime: 1,
    data: null,
    startIndex: 0,
    timerInterval: null,
    el: '#content',
    events: {
        'change #classFormat' : 'initTimer',
        'click .start-pretimer' : 'preTimer',
        'click .stop-timer' : 'stopTimer'
    },
    render: function ( timer ){
        var html = timerTemplate( timer.toJSON() );
        this.$el.html(html);
    },
    initTimer: function () {
        var that = this;
        var classFormat = $( '#classFormat' ).val();
        console.log( classFormat );
        if( classFormat !== 'none' ) {
          $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
            console.log( data );
            that.data = data;
            that.showMove( that.data.moves[0].type, that.data.moves[0].name);
            
          });
        }
        else $( '.next-move' ).html( 'No Format Selected' );
    },
    preTimer: function() {
        var that = this;
        this.timerInterval = setInterval( function() {
            that.updatePretimer();
        }, 1000 );
    },
    startTimer: function() {
        var that = this;
        this.timerInterval = setInterval( function() {
            that.nextMove();
        }, 1000 );
    },
    stopTimer: function() {
        clearInterval( this.timerInterval );
    },
    nextMove: function() {
        that = this;
        $( '.timer' ).html( this.startTime++ );
        if( this.startTime === 51 ) {
          that.startIndex++;
          if( that.startIndex < that.data.moves.length ) {
            that.showMove( that.data.moves[ that.startIndex ].type, that.data.moves[ that.startIndex ].name);
            $( '.next-move' ).addClass( 'blink_me' );
          }
        }

        if( this.startTime === 61 ) {
          that.startTime = 1;
          $( '.next-move' ).removeClass( 'blink_me' );
        }
    },
    updatePretimer: function() {
        var that = this;
        $( '.timer' ).html( this.startTime++ );
        if( this.startTime > 21 ) {
          that.startTime = 1;
          clearInterval( that.timerInterval );
          $( '.timer' ).html( that.startTime );
          that.startTimer();
          $( '.start-pretimer' ).addClass( '.start-timer' ).removeClass( '.start-pretimer' );
          $( '.start-timer' ).on( 'click', function() {
            that.startTimer();
          });
        }        
    },
    getClassFormat: function() {
        var that = this;
        var classFormat = $( '#classFormat' ).val();
        console.log( classFormat );
        if( classFormat !== 'none' ) {
          $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
            console.log( data );
            that.data = data;
            that.showMove( that.data.moves[0].type, that.data.moves[0].name);
          });
        }
        else $( '.next-move' ).html( 'No Format Selected' );
     },
     showMove: function(type, move) {
         $( '.move-type' ).html( type );
         $( '.next-move' ).html( move );
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
var timerTemplate = null;
var registerTemplate = null;
$(function() {
  var source   = Global.functions.getTemplate( 'home.html' );
  homeTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'timer.html' );
  timerTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'register.html' );
  registerTemplate = Handlebars.compile( source );
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();
