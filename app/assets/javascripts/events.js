// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {
  $( ".meet" ).draggable();

  var eventTimes = $('.event-time')
  for (i = 0; i < eventTimes.length; ++i) {
    var eventTime = parseInt($(eventTimes[i]).text());
    $(eventTimes[i]).html(moment(eventTime).format('DD/MM/YYYY, H:mm'));
  };
});
