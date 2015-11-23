var UserView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #timerView": "goToTimer"
    },
    render: function (user){
        var html = userTemplate(user.toJSON());
        this.$el.html(html);
    },
    goToTimer: function() {
        app_router.navigate('user', {trigger:true});
    }
});