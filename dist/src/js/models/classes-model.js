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