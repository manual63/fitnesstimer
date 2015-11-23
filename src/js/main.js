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
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's 
Backbone.history.start();
