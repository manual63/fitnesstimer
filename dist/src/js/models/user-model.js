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