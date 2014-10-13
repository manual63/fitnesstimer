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
});