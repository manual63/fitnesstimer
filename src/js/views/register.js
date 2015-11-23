var RegisterView = Backbone.View.extend({
    el: '#content',
    events: {
        'click button': 'createUser'
    },
    render: function (register){
        var html = registerTemplate(register.toJSON());
        this.$el.html(html);
    },
    createUser: function( event ) {
        event.preventDefault();
        var arr = $('form').serializeArray();

        $.post('http://www.fitnesstimerapi.dev/user/save', JSON.stringify( arr ), function( data ) {
            console.log( data );
            var appRouter = new AppRouter();
            appRouter.homeView();
        });

        //app_router.navigate('timer', {trigger:true});
    }
});