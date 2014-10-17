var Home = Backbone.Model.extend({
  urlRoot: 'data/home.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
  }
});

;var Timer = Backbone.Model.extend({
  urlRoot: 'data/timer.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
      
  }
});


;var HomeView = Backbone.View.extend({
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
});;var TimerView = Backbone.View.extend({
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
            $( '.next-move' ).html( that.data.moves[0].type + ' - ' + that.data.moves[0].name );
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
            $( '.next-move' ).html( that.data.moves[ that.startIndex ].type + ' - ' + that.data.moves[ that.startIndex ].name );
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
            $( '.next-move' ).html( that.data.moves[0].type + ' - ' + that.data.moves[0].name );
          });
        }
        else $( '.next-move' ).html( 'No Format Selected' );
     }
});

;var AppRouter = Backbone.Router.extend({ 
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
});;/* 
 * Timer functionality
 */

var fitnesstimer = {};

fitnesstimer.starttime = 1;
fitnesstimer.data;
fitnesstimer.startIndex = 0;
fitnesstimer.timer;

fitnesstimer.nextMove = function() {
  $( '.timer' ).html( fitnesstimer.starttime++ );
  if( fitnesstimer.starttime === 51 ) {
    fitnesstimer.startIndex++;
    if( fitnesstimer.startIndex < fitnesstimer.data.moves.length ) {
      $( '.next-move' ).html( fitnesstimer.data.moves[ fitnesstimer.startIndex ].type + ' - ' + fitnesstimer.data.moves[ fitnesstimer.startIndex ].name );
      $( '.next-move' ).addClass( 'blink_me' );
    }
  }

  if( fitnesstimer.starttime === 61 ) {
    fitnesstimer.starttime = 1;
    $( '.next-move' ).removeClass( 'blink_me' );
  }
};

fitnesstimer.preTimer = function() {
  fitnesstimer.timer = setInterval( 'fitnesstimer.updatePretimer()', 1000 );
};

fitnesstimer.updatePretimer = function() {
  $( '.timer' ).html( fitnesstimer.starttime++ );
  if( fitnesstimer.starttime > 21 ) {
    fitnesstimer.starttime = 1;
    clearInterval( fitnesstimer.timer );
    $( '.timer' ).html( fitnesstimer.starttime );
    fitnesstimer.startTimer();
    $( '.start-pretimer' ).addClass( '.start-timer' ).removeClass( '.start-pretimer' );
    $( '.start-timer' ).on( 'click', function() {
      fitnesstimer.startTimer();
    });
  }
};

fitnesstimer.startTimer = function() {
  fitnesstimer.timer = setInterval( 'fitnesstimer.nextMove()', 1000 );
};

fitnesstimer.stopTimer = function() {
  clearInterval( fitnesstimer.timer );
};

fitnesstimer.getClassFormat = function() {
  var classFormat = $( '#classFormat' ).val();
  console.log( classFormat );
  if( classFormat !== 'none' ) {
    $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
      console.log( data );
      fitnesstimer.data = data;
      $( '.next-move' ).html( fitnesstimer.data.moves[0].type + ' - ' + fitnesstimer.data.moves[0].name );
    });
  }
  else $( '.next-move' ).html( 'No Format Selected' );
};


