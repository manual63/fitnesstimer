var moves = Backbone.Model.extend({
  urlRoot: 'http://www.fitnesstimerapi.dev/classes/getclassmoves',
  url: function() {
    return this.urlRoot;
  },
  defaults: {
    moves : []
  } ,
  initialize: function() {
  }
});