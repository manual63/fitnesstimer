var move = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/getclassmove',
  url: function() {
    var moveId = $.getUrlVar('id');

    return this.urlRoot + '/' + moveId;
  },
  defaults: {
  	id: '',
    name: '',
   	type: '',
    order: '' 
  } ,
  initialize: function() {
  }
});