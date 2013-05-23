// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  /////////////////////////////////////////////////////////
  // Get JSON from Meetup API through own front-end hack //
  /////////////////////////////////////////////////////////

  $.getJSON('/events/meetup_api.json', function(data) {

    $('#event-list').html("");

    $.each(data, function(key, value) {
      var venueName = "empty name";

      if (value.venue) {
          venueName = value.venue.name;
      }

      ////////////////////////////////////////
      // Create Meetup event list from JSON //
      ////////////////////////////////////////

      $('#event-list').append("<li class='meet' data-event-id='" + value.id + "'>" + 
                                "<p class='event-url event-name'><a target='_blank' href='" + value.event_url + "'>" + value.name + "</a></p>" +
                                "<p class='event-group'> group:" + value.group.name + "</p>" +
                                "<p class='event-venue'> venue:" + venueName + "</p>" +
                                "<p class='event-time'>" + value.time + "</p>" +
                              "</li>");
    });

    /////////////////////////////////////
    // Change UNIX time with moment.js //
    /////////////////////////////////////

    var eventTimes = $('.event-time');
    for (var i = 0; i < eventTimes.length; ++i) {
      var eventTime = parseInt($(eventTimes[i]).text());
      $(eventTimes[i]).html(moment(eventTime).format('DD/MM/YYYY, H:mm'));
    }

    $(".sortable").sortable({

      connectWith: '.sortable',
      
      receive: function(event, ui) {
        var element = $(ui.item[0]);

        if (element.parent('ul').attr('id') === 'event-list') {
          console.log('dropped into event list');
        } else if (element.parent('ul').attr('id') === 'user-list') {
          console.log('dropped into user list');
          console.log($(element[0]).data('event-id'));

          $.ajax({

          });
        }
      }
    }).disableSelection();

  });
});
