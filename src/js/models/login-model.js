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