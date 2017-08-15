var map;

function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();


	hotels.forEach((hotel) => {
		$(`<option value=${hotel.name} data-place=${hotel.place.location}> ${hotel.name} </option>`).appendTo('#hotel-choices');
	})
	restaurants.forEach((restaurant) => {
		$(`<option value=${restaurant.name} data-place=${restaurant.place.location}> ${restaurant.name} </option>`).appendTo('#restaurant-choices');
	})
	activities.forEach((activity) => {
		$(`<option value=${activity.name} data-place=${activity.place.location}> ${activity.name} </option>`).appendTo('#activity-choices');
	})

	// attach listeners to add buttons
	$('#hotel-add').on('click', 'button', function () {
		let nod = $(this).parent().find(':selected');
		addToItinMap(nod, '#hotel-list');
	})

	$('#restaurant-add').on('click', 'button', function () {
		let nod = $(this).parent().find(':selected');
		addToItinMap(nod, '#restaurant-list');
	})

	$('#activity-add').on('click', 'button', function () {
		let nod = $(this).parent().find(':selected');
		addToItinMap(nod, '#activity-list');
	})

	function addToItinMap(nod, listId) {
		$(`<div class="itinerary-item">
			<span class="title">${nod.html()}</span>
			<button class="btn btn-xs btn-danger remove btn-circle">x</button>
			</div>`)
			.appendTo(listId);

		var loc = nod.get(0).dataset.place.split(',');
		//initialize latlong object
		var myLatlng = new google.maps.LatLng(loc[0], loc[1])

		// Add the marker to the map
		var marker = new google.maps.Marker({
			position: myLatlng,
			title: nod.html(),
			visible: true
		});
		// Add the marker to the map by calling setMap()
		marker.setMap(map);
		//remove itenary
		$('.itinerary-item > .remove').on('click', function () {
			$(this).parent().remove();
			marker.setMap(null);
		})
	}

});


