	var PlaceData = [
		{	name: "NuLife Yoga",
			description: "Yoga Studio",
			lat: "37.324167",
			lng: "-121.920274",
			address: "25 Dana Avenue, San Jose, CA 95126"
		},

		{	name: "Rose Garden",
			description: "Nice place to walk around",
			lat: "37.3319",
			lng: "-121.9286",
			address: "Dana Avenue and Naglee Avenue, San Jose, CA 95126"
		},

		{	name: "Tee Nee Thai Restaurant",
			description: "Cute place for Thai food",
			lat: "37.333245",
			lng: "-121.914273",
			address: "1423 The Alameda, San Jose, CA 95126"
		},

		{	name: "Hoover Theater",
			description: "Landmark theater in Hoover Middle School",
			lat: "37.33261",
			lng: "-121.92251",
			address: "1635 Park Avenue, San Jose, CA 95126"
		},

		{	name: "White Shallot Restaurant",
			description:  "One of our regular spots",
			lat: "37.32336",
			lng: "-121.95135",
			address: "3143 Stevens Creek Blvd, San Jose, CA 95117"
		},

		{	name: "The Red Stag",
			description: "Classic dive bar",
			lat: "37.3240527",
			lng: "-121.9219497",
			address: "1711 W San Carlos St, San Jose, CA 95128"
		},

		{	name:  "Zanotto's Market",
			description: "Neighborhood grocery store",
			lat: "37.328218",
			lng: "-121.931261",
			address: "1970 Naglee Avenue, San Jose, CA 95126"
		},

		{
			name: "Schuras Chocolate",
			description: "Schurra's Fine Confections - Your Hometown Candy Store Since 1912. ",
			lat: "37.331503",
			lng: "-121.90634",
			address: "840 The Alameda, San Jose, CA 95126"
		}

	];

	var map;
	var markers = [];

	function initMap() {
		var mapOptions = {
			center: new google.maps.LatLng(37.33,-121.93),
			zoom: 15,
			mapTypeControl: true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: true,
			mapTypeID: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		for (m in PlaceData) {
			var position = new google.maps.LatLng(PlaceData[m].lat, PlaceData[m].lng);
			addMarker(position);
		}
	}

	// Create marker and add it to the global marker array
	function addMarker(location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		markers.push(marker);
	}

	function delMarker(id) {
		console.log("Make marker " +id+ " invisible");
		markers[id].setVisible(false);
		console.log(markers[id].getVisible());
		markers[id].setMap(map);
	}

	var viewModel = function() {
		var self = this;

		 var slideout = new Slideout({
        	'panel': document.getElementById('panel'),
        	'menu': document.getElementById('menu'),
        	'padding': 256,
        	'tolerance': 70
      	});

      	// Toggle button
      	document.querySelector('.toggle-button').addEventListener('click', function() {
        	slideout.toggle();
      	});

	// Thanks to Dave, AndrewR, LaneSeals et. al. on the Udacity forum https://discussions.udacity.com/t/filtering-my-list-of-locations-with-ko/38858/15
	// I was having the exact same problem Dave faced with the .removeAll method implementation and this thread was a big help.
	// I should also acknowledge Brandon Keepers http://opensoul.org/2011/06/23/live-search-with-knockoutjs/ for the original idea
		self.placeArray = ko.observableArray(PlaceData);
		self.query = ko.observable('');
		self.place = ko.observable('-');
		search = function(value) {
			self.placeArray([]);
			for(var x in PlaceData) {
				if(PlaceData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
					self.placeArray.push(PlaceData[x]);
				else delMarker(x);
			}
		};
		self.query.subscribe(search);

		select = function(loc){
			self.place(loc);
			var myLatLng = new google.maps.LatLng(self.place().lat, self.place().lng);
			var newCenter = new google.maps.LatLng(self.place().lat, self.place().lng);
			map.panTo(newCenter);
			marker.addListener('click', toggleBounce);

			function toggleBounce() {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}

			marker.setMap(map);
		};

	};
	//Calls the initializeMap() function when the page loads
	window.addEventListener('load', initMap);

	// Let's get this started
	ko.applyBindings(new viewModel());