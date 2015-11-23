var CreateClassView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "createClass",
        "change input": "changed"
    },
    initialize: function () {
        _.bindAll(this, "changed");
        this.model = new FitnessClass();
        this.model.set({
            userId : $.cookie('userId')
        });
    },
    render: function (){
        var html = createClassTemplate();
        this.$el.html(html);
    },
    changed: function( e ) {
        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    createClass: function( e ) {
        e.preventDefault();
        this.model.save({}, {
            success: function( model, response, options ) {

            },
            error: function( model, xhr, options ) {

            }
        });
        app_router.navigate('createclass', {trigger:true});
    }
});