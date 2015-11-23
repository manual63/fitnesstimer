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