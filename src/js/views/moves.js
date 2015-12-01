var MovesView = Backbone.View.extend({
    el: '#content',
    events: {
        'click #addMove': 'createMove',
        'click .remove': 'removeClassMove'
    },
    initialize: function() {

    },
    render: function( moves ) {
        var _this = this; //Access to view scope;
        console.log( moves.get('classMoves') );
        var sortedMoves = moves.get('classMoves').sort(function(a, b){return a.order-b.order});
        moves.set(sortedMoves);
        var html = movesTemplate(moves.toJSON());
        this.$el.html(html).promise().done( function() {
            _this.updateMoveTypes();

            $( "#sortable" ).sortable({
                update: function(event, ui) {
                    _this.reorderMoves();
                }
            });
            $( "#sortable" ).disableSelection();
        });
    },
    removeView: function() {
      this.$el.empty().off(); /* off to unbind the events */
      this.stopListening();
      return this;
    },
    createMove: function () {
        var _this = this;
        var name = $('#moveName').val();
        var typeId = $('#moveType').val();
        var moveModel = new Move();

        moveModel.set({
            name: name,
            typeId: typeId,
            order: $('table tr').length - 1,
            classId: $.getUrlVar('classid'),
            userId: $.cookie('userId') 
        });

        moveModel.save({}, {
            success: function() {
                Backbone.history.loadUrl(Backbone.history.fragment);
                _this.removeView();
            },
            error: function() {
                alert('Error');
            }
        });
    },
    updateMoveTypes: function() {
        $.getJSON('http://www.fitnesstimerapi.dev/classes/movetypes', function( data ) {
            $.each( data.moveTypes, function( key, value ) {
                var option = '<option value="' + value.typeId + '">' + value.name + '</option>';
                $('#moveType').append( option );
            });
        });
    },
    removeClassMove: function( e ) {
        var _this = this;
        $.ajax({
            url: 'http://www.fitnesstimerapi.dev/classes/classmove/' + $.getUrlVar('classid') + '/' + $(e.currentTarget).data('move-id'),
            type: 'DELETE',
            success: function() {
                Backbone.history.loadUrl(Backbone.history.fragment);
                _this.removeView();
            },
            error: function() {
                alert('Error');
            }
        });
    },
    reorderMoves: function() {
        //alert('reorderMoves');
        var liMoves = $('ul li');
        var newOrder = new Array();
        $.each( liMoves, function( key, value ) {
            var order = key + 1;
            $(value).attr('data-sort-order', order);
            var moveId = $(value).find('.remove').attr('data-move-id');
            console.log('moveId = ' + moveId);
            newOrder.push({
                moveId: moveId,
                moveOrder: order
            });
        });

        $.ajax({
            url: 'http://www.fitnesstimerapi.dev/classes/moveorder/' + $.getUrlVar('classid'),
            type: 'PUT',
            data: JSON.stringify( newOrder ),
            dataType: 'json',
            success: function( data ) {
                console.log('Success');
            },
            fail: function(xhr, text, err) {
                console.log('Failed!');
            }
        });
    }
});