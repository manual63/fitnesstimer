var WelcomeView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #createClass": "createClass",
        "click #chooseClass": "showClasses"
    },
    render: function ( welcome ){
        var html = welcomeTemplate( welcome.toJSON() );
        this.$el.html( html );
    },
    createClass: function() {
        app_router.navigate( 'createclass', { trigger:true } );
    },
    showClasses: function() {
        app_router.navigate( 'getclasses', { trigger:true } );
    }
});