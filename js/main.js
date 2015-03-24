var Home = Backbone.Model.extend({
  urlRoot: 'data/home.json',
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

var TimerView = Backbone.View.extend({
    startTime: 19,
    timerActive: false,
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
        if( !this.timerActive ) {
          this.timerInterval = setInterval( function() {
              that.updatePretimer();
          }, 1000 );
          this.timerActive = true;
        }
        else {
          //Do nothing
        }
    },
    startTimer: function() {
        var that = this;
        this.timerInterval = setInterval( function() {
            that.nextMove();
        }, 1000 );
    },
    stopTimer: function() {
        clearInterval( this.timerInterval );
        this.timerActive = false;
    },
    nextMove: function() {
        that = this;
        $( '.timer' ).html( this.startTime-- );
        if( this.startTime === 9 ) {
          that.startIndex++;
          if( that.startIndex < that.data.moves.length ) {
            that.showMove( that.data.moves[ that.startIndex ].type, that.data.moves[ that.startIndex ].name);
            $( '.next-move' ).addClass( 'blink_me' );
          }
        }

        if( this.startTime === 0 ) {
          that.startTime = 60;
          $( '.next-move' ).removeClass( 'blink_me' );
        }
    },
    updatePretimer: function() {
        var that = this;
        $( '.timer' ).html( this.startTime-- );
        if( this.startTime < 0 ) {
          that.startTime = 60;
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
