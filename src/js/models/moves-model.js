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