
    var ugitimer = {};

    ugitimer.starttime = 1;
    ugitimer.data;
    ugitimer.startIndex = 0;
    ugitimer.timer;

    ugitimer.nextMove = function() {
      $( '.timer' ).html( ugitimer.starttime++ );
      if( ugitimer.starttime === 51 ) {
        ugitimer.startIndex++;
        if( ugitimer.startIndex < ugitimer.data.moves.length ) {
          $( '.next-move' ).html( ugitimer.data.moves[ ugitimer.startIndex ].type + ' - ' + ugitimer.data.moves[ ugitimer.startIndex ].name );
        }
      }

      if( ugitimer.starttime === 61 ) {
        ugitimer.starttime = 1;
      }
    }

    ugitimer.preTimer = function() {
      ugitimer.timer = setInterval( 'ugitimer.updatePretimer()', 1000 );
    }

    ugitimer.updatePretimer = function() {
      $( '.timer' ).html( ugitimer.starttime++ );
      if( ugitimer.starttime > 21 ) {
        ugitimer.starttime = 1;
        clearInterval( ugitimer.timer );
        $( '.timer' ).html( ugitimer.starttime );
        ugitimer.startTimer();
        $( '.start-pretimer' ).addClass( '.start-timer' ).removeClass( '.start-pretimer' );
        $( '.start-timer' ).on( 'click', function() {
          ugitimer.startTimer();
        });
      }
    }

    ugitimer.startTimer = function() {
      ugitimer.timer = setInterval( 'ugitimer.nextMove()', 1000 );
    }

    ugitimer.stopTimer = function() {
      clearInterval( ugitimer.timer );
    }

    ugitimer.getClassFormat = function() {
      var classFormat = $( '.select-class select' ).val();
      console.log( classFormat );
      $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
        console.log( data );
        ugitimer.data = data;
        $( '.next-move' ).html( ugitimer.data.moves[0].type + ' - ' + ugitimer.data.moves[0].name );
      });
    }

    $(function() {
      $( '.start-pretimer' ).on( 'click', function() {
        ugitimer.preTimer();
      });

      $( '.stop-timer' ).on( 'click', function() {
        ugitimer.stopTimer();
      });

      ugitimer.getClassFormat();

      $( '.select-class select' ).on( 'change', function() {
        ugitimer.getClassFormat();
      });
    });