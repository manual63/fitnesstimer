var LoginView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "login",
        "change input": "changed"
    },
    initialize: function () {
        _.bindAll(this, "changed");
        this.model = new Login();
    },
    render: function (login){
        var html = loginTemplate(login.toJSON());
        this.$el.html(html);
    },
    changed: function( e ) {
        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    login: function( e ) {
        e.preventDefault();
        this.model.save({}, {
            success: function( model, response, options ) {
                $.cookie( 'userId', response.id );
                welcome = new Welcome( response );
                Global.functions.clearView();

                var view = new WelcomeView();
                view.render( welcome );
                Global.loggedInUser = welcome;

                window.history.pushState( '', '', '/#welcome' );
            },
            error: function( model, xhr, options ) {
                alert( 'error' );
            }
        });
    }
});