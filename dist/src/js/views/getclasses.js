var GetClassesView = Backbone.View.extend({
    el: '#content',
    events: {
        "submit form": "createClass",
        "change input": "changed"
    },
    initialize: function () {
       // _.bindAll(this, "changed");
       // this.model = new FitnessClass();
    },
    render: function ( fitnessClasses ){
        var html = getClassesTemplate(fitnessClasses.toJSON());
        this.$el.html(html);
    }
});