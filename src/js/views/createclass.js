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
    removeView: function() {
      this.$el.empty().off(); /* off to unbind the events */
      this.stopListening();
      return this;
    },
    changed: function( e ) {
        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.id] = value;
        this.model.set(obj);
    },
    createClass: function( e ) {
        var _this = this;
        e.preventDefault();
        this.model.save({}, {
            success: function( model, response, options ) {
                _this.removeView();
                app_router.navigate('getclasses', {trigger:true});
            },
            error: function( model, xhr, options ) {
                alert('Error');
            }
        });
    }
});