var map;
var currentDayIdx = 0;

//array of day objects
//day objects will have key attractionType and value is an array of attractions added to itinerary
var days = [{ hotel: [], restaurant: [], activity: [] }];

function initialize_gmaps() {
	// initialize new google maps LatLng object
	var myLatlng = new google.maps.LatLng(40.705189, -74.009209);
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
		title: "Hello World!"
	});
	// Add the marker to the map by calling setMap()
	marker.setMap(map);
}

$(document).ready(function () {
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
		console.log(nod);
		$(`<div class="itinerary-item">
			<span class="title">${nod.html()}</span>
			<button class="btn btn-xs btn-danger remove btn-circle">x</button>
			</div>`)
			.appendTo(listId);

		//at currentdayidx we want to find appropriate key, based on listId.split('-')[0]
		//push nod.html() to that key's array
		const attractionArr = days[currentDayIdx][listId.split('-')[0].slice(1)];

		attractionArr.push(nod);

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
			//find index of item in appropriate array
			//find the index where nod.html is and splice from that index
			var remIdx = attractionArr.indexOf(nod.html());
			attractionArr.splice(remIdx, 1);
		})
	}

	//add new day, which will also come with a button to switch to that day
	$('#day-add').on('click', function () {
		var newDay = $('.day-buttons button').length;
		//add new day to days array model
		days.push({ hotel: [], restaurant: [], activity: [] });
		$(`<button class="btn btn-circle day-btn">${newDay}</button>`).insertBefore(this);
		//adding switching day onclick listener
		$('.day-btn:not(#day-add)').on('click', function () {
			$('button').removeClass('current-day');
			$(this).addClass('current-day');
			//currentDayIdx needs to be selected day
			currentDayIdx = parseInt(this.innerHTML) - 1;
			$('#day-title span')[0].innerHTML = `Day ${currentDayIdx + 1}`;
			//populate itinerary
			//hotel
			days[currentDayIdx].hotel.forEach((nod) => {
				addToItinMap(nod,"#hotel-list");
			})
			//restaurant
			days[currentDayIdx].restaurant.forEach((nod) => {
				addToItinMap(nod,"#restaurant-list");
			})
			//activity
			days[currentDayIdx].activity.forEach((nod) => {
				addToItinMap(nod,"#activity-list");
			})
		})

	})



});


