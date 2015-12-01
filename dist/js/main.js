var FitnessClass = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/fitnessclass',
  url: function() {
  	return this.urlRoot;
  },
  defaults: {
  	userId: '',
    classId: '',
   	name: '' 
  } ,
  initialize: function() {
  }
});
var FitnessClasses = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/getfitnessclasses',
  url: function() {
    var userId;
    if( $.cookie( "userId") ) {
      userId = $.cookie( "userId");
    }
    else {
      app_router.navigate('home', {trigger:true});
    }

  	return this.urlRoot + '/' + userId;
  },
  defaults: {},
  initialize: function() {
      
  }
});
var ClasstypeModel = Backbone.Model.extend({
	urlRoot: 'http://www.fitnesstimerapi.dev/classes/addclassmove',
	url: function() {
		var moveid = $.getUrlVar('moveid');

		return this.urlRoot + '/' + moveId;
	},
	defaults: {
		typeId: '',
		name: ''
	},
	initialize: function() {
		
	}
});
var Home = Backbone.Model.extend({
  urlRoot: 'data/home.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
  }
});


var Login = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/user/login',
  defaults: {
    emailAddress: '',
    password: ''
  },
  initialize: function() {
      console.log('initialize login');
  },
  validate: function( attr ) {
    if( !attr.emailAddress ) {
      return 'Invalid Email Address.';
    }
    else if( !attr.password ) {
      return 'Invalid Password.';
    }
  }
});
var Move = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/classmove',
  url: function() {
    return this.urlRoot;
  },
  defaults: {
  	id: '',
    name: '',
   	typeId: '',
    order: '',
    classId: '',
    userId: '' 
  } ,
  initialize: function() {
  }
});
var Moves = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/getclassmoves',
  url: function() {
    var classId = $.getUrlVar('classid');

    return this.urlRoot + '/' + classId;
  },
  defaults: {
    classMoves : []
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



var User = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/user/user',
  url: function() {
    var userId;
    if( $.cookie( "userId") ) {
      userId = $.cookie( "userId");
    }
    else {
      userId = $.getUrlVar('id');
    }

  	return this.urlRoot + '/' + userId;
  },
  defaults: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  } ,
  initialize: function() {
      
  }
});
var Users = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/user/users',
  url: function() {
  	var base = this.urlRoot || (this.collection && this.collection.url) || "/";
  	if( this.isNew() ) return base;

  	return base + '/' + this.id;
  },
  defaults: {},
  initialize: function() {
      
  }
});
var Welcome = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  } ,
  initialize: function() {
      
  }
});
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
var CreateClassView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "createClass",
        "change input": "changed"
    },
    initialize: function () {
        _.bindAll(this, "changed");
        this.model = new FitnessClass();
        this.model.set({
            userId : $.cookie('userId')
        });
    },
    render: function (){
        var html = createClassTemplate();
        this.$el.html(html);
    },
    removeView: function() {
      this.$el.empty().off(); /* off to unbind the events */
      this.stopListening();
      return this;
    },
    changed: function( e ) {
        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    createClass: function( e ) {
        var _this = this;
        e.preventDefault();
        this.model.save({}, {
            success: function( model, response, options ) {
                _this.removeView();
                app_router.navigate('getclasses', {trigger:true});
            },
            error: function( model, xhr, options ) {
                alert('Error');
            }
        });
    }
});
var GetClassesView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "createClass",
        "change input": "changed"
    },
    initialize: function () {
       // _.bindAll(this, "changed");
       // this.model = new FitnessClass();
    },
    render: function ( fitnessClasses ){
        var html = getClassesTemplate(fitnessClasses.toJSON());
        this.$el.html(html);
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
var LoginView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "login",
        "change input": "changed"
    },
    initialize: function () {
        _.bindAll(this, "changed");
        this.model = new Login();
    },
    render: function (login){
        var html = loginTemplate(login.toJSON());
        this.$el.html(html);
    },
    changed: function( e ) {
        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    login: function( e ) {
        e.preventDefault();
        this.model.save({}, {
            success: function( model, response, options ) {
                $.cookie( 'userId', response.id );
                welcome = new Welcome( response );
                Global.functions.clearView();

                var view = new WelcomeView();
                view.render( welcome );
                Global.loggedInUser = welcome;

                window.history.pushState( '', '', '/#welcome' );
            },
            error: function( model, xhr, options ) {
                alert( 'error' );
            }
        });
    }
});
var MovesView = Backbone.View.extend({
    el: '#content',
    events: {
        'click #addMove': 'createMove',
        'click .remove': 'removeClassMove'
    },
    initialize: function() {

    },
    render: function( moves ) {
        var _this = this; //Access to view scope;
        console.log( moves.get('classMoves') );
        var sortedMoves = moves.get('classMoves').sort(function(a, b){return a.order-b.order});
        moves.set(sortedMoves);
        var html = movesTemplate(moves.toJSON());
        this.$el.html(html).promise().done( function() {
            _this.updateMoveTypes();

            $( "#sortable" ).sortable({
                update: function(event, ui) {
                    _this.reorderMoves();
                }
            });
            $( "#sortable" ).disableSelection();
        });
    },
    removeView: function() {
      this.$el.empty().off(); /* off to unbind the events */
      this.stopListening();
      return this;
    },
    createMove: function () {
        var _this = this;
        var name = $('#moveName').val();
        var typeId = $('#moveType').val();
        var moveModel = new Move();

        moveModel.set({
            name: name,
            typeId: typeId,
            order: $('table tr').length - 1,
            classId: $.getUrlVar('classid'),
            userId: $.cookie('userId') 
        });

        moveModel.save({}, {
            success: function() {
                Backbone.history.loadUrl(Backbone.history.fragment);
                _this.removeView();
            },
            error: function() {
                alert('Error');
            }
        });
    },
    updateMoveTypes: function() {
        $.getJSON('http://www.fitnesstimerapi.dev/classes/movetypes', function( data ) {
            $.each( data.moveTypes, function( key, value ) {
                var option = '<option value="' + value.typeId + '">' + value.name + '</option>';
                $('#moveType').append( option );
            });
        });
    },
    removeClassMove: function( e ) {
        var _this = this;
        $.ajax({
            url: 'http://www.fitnesstimerapi.dev/classes/classmove/' + $.getUrlVar('classid') + '/' + $(e.currentTarget).data('move-id'),
            type: 'DELETE',
            success: function() {
                Backbone.history.loadUrl(Backbone.history.fragment);
                _this.removeView();
            },
            error: function() {
                alert('Error');
            }
        });
    },
    reorderMoves: function() {
        //alert('reorderMoves');
        var liMoves = $('ul li');
        var newOrder = new Array();
        $.each( liMoves, function( key, value ) {
            var order = key + 1;
            $(value).attr('data-sort-order', order);
            var moveId = $(value).find('.remove').attr('data-move-id');
            console.log('moveId = ' + moveId);
            newOrder.push({
                moveId: moveId,
                moveOrder: order
            });
        });

        $.ajax({
            url: 'http://www.fitnesstimerapi.dev/classes/moveorder/' + $.getUrlVar('classid'),
            type: 'PUT',
            data: JSON.stringify( newOrder ),
            dataType: 'json',
            success: function( data ) {
                console.log('Success');
            },
            fail: function(xhr, text, err) {
                console.log('Failed!');
            }
        });
    }
});
var RegisterView = Backbone.View.extend({
    el: '#content',
    events: {
        'click button': 'createUser'
    },
    render: function (register){
        var html = registerTemplate(register.toJSON());
        this.$el.html(html);
    },
    createUser: function( event ) {
        event.preventDefault();
        var arr = $('form').serializeArray();

        $.post('http://www.fitnesstimerapi.dev/user/save', JSON.stringify( arr ), function( data ) {
            console.log( data );
            var appRouter = new AppRouter();
            appRouter.homeView();
        });

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


var UserView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #timerView": "goToTimer"
    },
    render: function (user){
        var html = userTemplate(user.toJSON());
        this.$el.html(html);
    },
    goToTimer: function() {
        app_router.navigate('user', {trigger:true});
    }
});
var UsersView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #deleteUser": "deleteUser"
    },
    render: function (users){
        var html = usersTemplate(users.toJSON());
        this.$el.html(html);
    },
    deleteUser: function( e ) {
        var userId = $( e.currentTarget ).data('user-id');
        alert('Are you sure you want to permanently remove user with id of ' + userId + '?');
        $.ajax({
            type: 'DELETE',
            url: 'http://www.fitnesstimerapi.dev/user/deleteuser/' + userId,
            contentType: "application/json",
            xhrFields: {withCredentials: true },
            dataType: "text",
            data: {
                id : userId
            },
            success: function() {
                var appRouter = new AppRouter();
                appRouter.usersView();
            },
            error: function( err ) {
                console.log( "ERROR: ", err );
            }
        });
    }
});

var WelcomeView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #createClass": "createClass",
        "click #chooseClass": "showClasses"
    },
    render: function ( welcome ){
        var html = welcomeTemplate( welcome.toJSON() );
        this.$el.html( html );
    },
    createClass: function() {
        app_router.navigate( 'createclass', { trigger:true } );
    },
    showClasses: function() {
        app_router.navigate( 'getclasses', { trigger:true } );
    }
});
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {},
      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling $.cookie().
      cookies = document.cookie ? document.cookie.split('; ') : [],
      i = 0,
      l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split('='),
        name = decode(parts.shift()),
        cookie = parts.join('=');

      if (key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

// End jquery-cookie

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
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
  },
  loggedInUser: {}
};

var homeTemplate = null;
var timerTemplate = null;
var registerTemplate = null;
var usersTemplate = null;
var userTemplate = null;
var loginTemplate = null;
var welcomeTemplate = null;
var createClassTemplate = null;
var getClassesTemplate = null;
var movesTemplate = null;
$(function() {
  var source   = Global.functions.getTemplate( 'home.html' );
  homeTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'timer.html' );
  timerTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'register.html' );
  registerTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'users.html' );
  usersTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'user.html' );
  userTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'login.html' );
  loginTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'welcome.html' );
  welcomeTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'createclass.html' );
  createClassTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'showclasses.html' );
  getClassesTemplate = Handlebars.compile( source );

  var source   = Global.functions.getTemplate( 'moves.html' );
  movesTemplate = Handlebars.compile( source );
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();
