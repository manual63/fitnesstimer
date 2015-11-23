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