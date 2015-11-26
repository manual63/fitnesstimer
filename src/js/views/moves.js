var MovesView = Backbone.View.extend({
    el: '#content',
    events: {
        "click #addMove": "createMove",
        "change input": "changed"
    },
    initialize: function() {
       // _.bindAll(this, "changed");
       // this.model = new FitnessClass();
    },
    render: function( moves ) {
        var _this = this; //Access to view scope;
        var html = movesTemplate(moves.toJSON());
        this.$el.html(html).promise().done( function() {
            _this.updateMoveTypes();
        });
    },
    createMove: function () {
        var name = $('#moveName').val();
        var typeId = $('#moveType').val();

        alert( 'add ' + name + ' typeid ' + typeId );
    },
    updateMoveTypes: function() {
        $.getJSON('http://www.fitnesstimerapi.dev/classes/movetypes', function( data ) {
            $.each( data.moveTypes, function( key, value ) {
                var option = '<option value="' + value.typeId + '">' + value.name + '</option>';
                $('#moveType').append( option );
            });
        });
    }
});