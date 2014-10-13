/* 
    Main Global JavaScript file
 */

var classFormat = null;

if( classFormat === null ) {
    //Do AJAX call to get format data for display and some text
    classFormat = {};
}

$(function() {
  $( '.start-pretimer' ).on( 'click', function() {
    fitnesstimer.preTimer();
  });

  $( '.stop-timer' ).on( 'click', function() {
    fitnesstimer.stopTimer();
  });

  //fitnesstimer.getClassFormat();

  $( '#classFormat' ).on( 'change', function() {
    fitnesstimer.getClassFormat();
  });
});;/* 
 * Timer functionality
 */

var fitnesstimer = {};

fitnesstimer.starttime = 1;
fitnesstimer.data;
fitnesstimer.startIndex = 0;
fitnesstimer.timer;

fitnesstimer.nextMove = function() {
  $( '.timer' ).html( fitnesstimer.starttime++ );
  if( fitnesstimer.starttime === 51 ) {
    fitnesstimer.startIndex++;
    if( fitnesstimer.startIndex < fitnesstimer.data.moves.length ) {
      $( '.next-move' ).html( fitnesstimer.data.moves[ fitnesstimer.startIndex ].type + ' - ' + fitnesstimer.data.moves[ fitnesstimer.startIndex ].name );
      $( '.next-move' ).addClass( 'blink_me' );
    }
  }

  if( fitnesstimer.starttime === 61 ) {
    fitnesstimer.starttime = 1;
    $( '.next-move' ).removeClass( 'blink_me' );
  }
};

fitnesstimer.preTimer = function() {
  fitnesstimer.timer = setInterval( 'fitnesstimer.updatePretimer()', 1000 );
};

fitnesstimer.updatePretimer = function() {
  $( '.timer' ).html( fitnesstimer.starttime++ );
  if( fitnesstimer.starttime > 21 ) {
    fitnesstimer.starttime = 1;
    clearInterval( fitnesstimer.timer );
    $( '.timer' ).html( fitnesstimer.starttime );
    fitnesstimer.startTimer();
    $( '.start-pretimer' ).addClass( '.start-timer' ).removeClass( '.start-pretimer' );
    $( '.start-timer' ).on( 'click', function() {
      fitnesstimer.startTimer();
    });
  }
};

fitnesstimer.startTimer = function() {
  fitnesstimer.timer = setInterval( 'fitnesstimer.nextMove()', 1000 );
};

fitnesstimer.stopTimer = function() {
  clearInterval( fitnesstimer.timer );
};

fitnesstimer.getClassFormat = function() {
  var classFormat = $( '#classFormat' ).val();
  console.log( classFormat );
  if( classFormat !== 'none' ) {
    $.getJSON( 'classes/' + classFormat + '.json', function( data ) {
      console.log( data );
      fitnesstimer.data = data;
      $( '.next-move' ).html( fitnesstimer.data.moves[0].type + ' - ' + fitnesstimer.data.moves[0].name );
    });
  }
  else $( '.next-move' ).html( 'No Format Selected' );
};


