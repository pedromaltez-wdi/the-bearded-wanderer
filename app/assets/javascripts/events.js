// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  // var update = function(id, droparea) {
  //   console.log(id);
  //   console.log(droparea);
  //   switch(droparea) {
  //     case 'dropzone';
  //       droppers[id] = draggers[id];
  //       delete draggers[id];
  //       break;
  //     case 'dropzone';
  //       draggers[id] = droppers[id];
  //       delete droppers[id];
  //       break;
  //   }
  // };

  var adjustment;

  $("#origin").sortable({connectWith: "#drop"});

  $("#drop").sortable({connectWith: "#origin"});

  $("ol.simple_with_animation").sortable({

    group: 'simple_with_animation',
    pullPlaceholder: false,
    
    // animation on drop
    onDrop: function  (item, targetContainer, _super) {
      update(item.data('value'), targetContainer.el[0].id);

      var clonedItem = $('<li/>').css({height: 0});
      item.before(clonedItem);
      clonedItem.animate({'height': item.height()});
      
      item.animate(clonedItem.position(), function  () {
        clonedItem.detach();

        _super(item);
      });
    }

    // // set item relative to cursor position
    // onDragStart: function ($item, container, _super) {
    //   var offset = $item.offset(),
    //   pointer = container.rootGroup.pointer

    //   adjustment = {
    //     left: pointer.left - offset.left,
    //     top: pointer.top - offset.top
    //   }

    //   _super($item, container)
    // },
    // onDrag: function ($item, position) {
    //   $item.css({
    //     left: position.left - adjustment.left,
    //     top: position.top - adjustment.top
    //   })
    // }
  });

      /////////////////////////////////////////////////////////
      // Get JSON from Meetup API through own front-end hack //
      /////////////////////////////////////////////////////////

      $.getJSON('/events/meetup_api.json', function(data) {
        console.log(data);

        $.each(data, function(key, value) {
          var venueName = "empty name";

          if (value.venue) {
              venueName = value.venue.name;
          }

          ////////////////////////////////////////
          // Create Meetup event list from JSON //
          ////////////////////////////////////////

          $('#origin').append("<div>" + 
                                "<li class='event-url event-name'><a target='_blank' href='" + value.event_url + "'>" + value.name + "</a></li>" +
                                "<li class='event-group'> group:" + value.group.name + "</li>" +
                                "<li class='event-venue'> venue:" + venueName + "</li>" +
                                "<li class='event-time'>" + value.time + "</li>" +
                              "</div>");
        });

        /////////////////////////////////////
        // Change UNIX time with moment.js //
        /////////////////////////////////////

        var eventTimes = $('.event-time');
        for (var i = 0; i < eventTimes.length; ++i) {
          var eventTime = parseInt($(eventTimes[i]).text());
          $(eventTimes[i]).html(moment(eventTime).format('DD/MM/YYYY, H:mm'));
        }
      });

});
