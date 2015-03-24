var Home = Backbone.Model.extend({
  urlRoot: 'data/home.json',
  defaults: {
    title: '',
    description: '' 
  } ,
  initialize: function() {
  }
});

