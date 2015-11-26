var ClasstypeModel = Backbone.Model.extend({
	urlRoot: 'http://www.fitnesstimerapi.dev/classes/addclassmove',
	url: function() {
		var moveid = $.getUrlVar('moveid');

		return this.urlRoot + '/' + moveId;
	},
	defaults: {
		typeId: '',
		name: ''
	},
	initialize: function() {
		
	}
});