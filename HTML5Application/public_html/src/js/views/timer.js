var TimerView = Backbone.View.extend({
    startTime: 1,
    data: null,
    startIndex: 0,
    timerInterval: null,
    el: '#content',
    events: {
        'change #classFormat' : 'initTimer',
        'click .start-pretimer' : 'preTimer',
        'click .stop-timer' : 'stopTimer'
    },
    render: function ( timer ){
        var html = timerTemplate( timer.toJSON() );
        this.$el.html(html);
    },
    initTimer: function () {
        var that = this;
        var classFormat = $( '#classFormat' ).val();
        console.log( classFormat );
        if( classFormat !== 'none' ) {
          $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
            console.log( data );
            that.data = data;
            $( '.next-move' ).html( that.data.moves[0].type + ' - ' + that.data.moves[0].name );
          });
        }
        else $( '.next-move' ).html( 'No Format Selected' );
    },
    preTimer: function() {
        var that = this;
        this.timerInterval = setInterval( function() {
            that.updatePretimer();
        }, 1000 );
    },
    startTimer: function() {
        var that = this;
        this.timerInterval = setInterval( function() {
            that.nextMove();
        }, 1000 );
    },
    stopTimer: function() {
        clearInterval( this.timerInterval );
    },
    nextMove: function() {
        that = this;
        $( '.timer' ).html( this.startTime++ );
        if( this.startTime === 51 ) {
          that.startIndex++;
          if( that.startIndex < that.data.moves.length ) {
            $( '.next-move' ).html( that.data.moves[ that.startIndex ].type + ' - ' + that.data.moves[ that.startIndex ].name );
            $( '.next-move' ).addClass( 'blink_me' );
          }
        }

        if( this.startTime === 61 ) {
          that.startTime = 1;
          $( '.next-move' ).removeClass( 'blink_me' );
        }
    },
    updatePretimer: function() {
        var that = this;
        $( '.timer' ).html( this.startTime++ );
        if( this.startTime > 21 ) {
          that.startTime = 1;
          clearInterval( that.timerInterval );
          $( '.timer' ).html( that.startTime );
          that.startTimer();
          $( '.start-pretimer' ).addClass( '.start-timer' ).removeClass( '.start-pretimer' );
          $( '.start-timer' ).on( 'click', function() {
            that.startTimer();
          });
        }        
    },
    getClassFormat: function() {
        var that = this;
        var classFormat = $( '#classFormat' ).val();
        console.log( classFormat );
        if( classFormat !== 'none' ) {
          $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
            console.log( data );
            that.data = data;
            $( '.next-move' ).html( that.data.moves[0].type + ' - ' + that.data.moves[0].name );
          });
        }
        else $( '.next-move' ).html( 'No Format Selected' );
     }
});

