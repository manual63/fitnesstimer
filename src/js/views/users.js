var UsersView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #deleteUser": "deleteUser"
    },
    render: function (users){
        var html = usersTemplate(users.toJSON());
        this.$el.html(html);
    },
    deleteUser: function( e ) {
        var userId = $( e.currentTarget ).data('user-id');
        alert('Are you sure you want to permanently remove user with id of ' + userId + '?');
        $.ajax({
            type: 'DELETE',
            url: 'http://www.fitnesstimerapi.dev/user/deleteuser/' + userId,
            contentType: "application/json",
            xhrFields: {withCredentials: true },
            dataType: "text",
            data: {
                id : userId
            },
            success: function() {
                var appRouter = new AppRouter();
                appRouter.usersView();
            },
            error: function( err ) {
                console.log( "ERROR: ", err );
            }
        });
    }
});