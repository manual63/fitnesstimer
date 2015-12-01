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