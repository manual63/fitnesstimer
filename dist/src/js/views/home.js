var HomeView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #timerView": "goToTimer"
    },
    render: function (home){
        var html = homeTemplate(home.toJSON());
        this.$el.html(html);
    },
    goToTimer: function() {
        app_router.navigate('timer', {trigger:true});
    }
});