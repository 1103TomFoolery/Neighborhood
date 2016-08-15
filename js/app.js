	var PlaceData = [
		{	name: "NuLife Yoga",
			description: "Yoga Studio",
			lat: "37.324228",
			lng: "-121.920293",
			address: "25 Dana Avenue, San Jose, CA 95126",
			fourSqID: "4becc2bc8bbcc9283dcd8cb1"
		},

		{	name: "Rose Garden",
			description: "Nice place to walk around",
			lat: "37.3319",
			lng: "-121.9286",
			address: "Dana Avenue and Naglee Avenue, San Jose, CA 95126",
			fourSqID: "49eb850cf964a520ef661fe3"
		},

		{	name: "Tee Nee Thai Restaurant",
			description: "Cute place for Thai food",
			lat: "37.33331455029262",
			lng: "-121.91420129861713",
			address: "1423 The Alameda, San Jose, CA 95126",
			fourSqID: "5430ba5b498e87553f3c72dc"
		},

		{	name: "Hoover Theater",
			description: "Landmark theater in Hoover Middle School",
			lat: "37.33261",
			lng: "-121.92251",
			address: "1635 Park Avenue, San Jose, CA 95126",
			fourSqID: "4b64f462f964a52018dc2ae3"
		},

		{	name: "White Shallot Restaurant",
			description:  "One of our regular spots",
			lat: "37.32336",
			lng: "-121.95135",
			address: "3143 Stevens Creek Blvd, San Jose, CA 95117",
			fourSqID: "4aeb56dcf964a52025c121e3"
		},

		{	name: "The Red Stag",
			description: "Classic dive bar",
			lat: "37.3240527",
			lng: "-121.9219497",
			address: "1711 W San Carlos St, San Jose, CA 95128",
			fourSqID: "4b1a0b90f964a52033e723e3"
		},

		{	name:  "Zanotto's Market",
			description: "Neighborhood grocery store",
			lat: "37.328218",
			lng: "-121.931261",
			address: "1970 Naglee Avenue, San Jose, CA 95126",
			fourSqID: "4a6f6779f964a52016d61fe3"
		},

		{
			name: "Schuras Chocolate",
			description: "Schurra's Fine Confections - Your Hometown Candy Store Since 1912. ",
			lat: "37.331503",
			lng: "-121.90634",
			address: "840 The Alameda, San Jose, CA 95126",
			fourSqID: "4a8749b1f964a520a80320e3"
		}

	];

	var map;
	var infoWindow;
	var places = [];
	var bounds;

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
		infoWindow = new google.maps.InfoWindow();
		bounds = new google.maps.LatLngBounds();
		addMarkers();
		// for (m in PlaceData) {
		// 	var position = new google.maps.LatLng(PlaceData[m].lat, PlaceData[m].lng);
		// 	addMarker(position);
		// }
	}

	// Create marker and add it to the global marker array
	function addMarkers() {
		
		// OAuth stuff for Foursquare
		var FourSquare_CLIENT_ID = 'WF5GQFL1SI3MI1LGFKKGJFJVGPMVSMATA1CBVGYXT4CF2ED0';
		var FourSquare_CLIENT_SECRET = 'OMIQ0CV20ZZRKM1ENXZMKQJCECNQBBT2ONGPUHZ4TZK3LZHJ';
		PlaceData.forEach(function(place){

			// Foursquare api ajax request
			$.ajax ({
				type:  "GET",
				dataType: "json",
				url:'https://api.foursquare.com/v2/venues/explore',
				data: 'limit=1&ll=' + place.lat + ',' + place.lng + '&query=' + place.name + '&client_id=' + FourSquare_CLIENT_ID + '&client_secret=' + FourSquare_CLIENT_SECRET + '&v=201408066&m=foursquare',
				aync: true,
				success: function(data) {
					place.rating = data.response.groups[0].items[0].venue.rating;
					if (!place.rating){
						place.rating = 'No Foursquare rating available';
					}
					place.likes = data.response.groups[0].items[0].tips[0].likes.count;
					if (!place.likes) {
						place.likes = 0;
					}
//					console.log(data);
					marker.content = '<br><div class="labels">' + '<div class="title">' + place.name + '</div><div class="rating">Foursquare rating: ' + place.rating + '</div><p>' + place.description + '</p><div class="summary">Foursquare Likes: ' + place.likes + '</div>';
				},
				error: function(data) {
					// callback function if error - display alert 
					alert("Could not load data from Foursquare");
				}
			});
			// create markers
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(place.lat, place.lng),
				map: map,
				title: place.name,
				draggable: false,
				animation: google.maps.Animation.DROP,
				info: place.description,
				url: place.url,
				rating: place.rating,
				listClick: function(thisMarker){
					infowindow.setContent(marker.content);
					infowindow.open(map, thisMarker);
				}
			});

			bounds.extend(marker.position);
//			marker.addListener('click', toggleBounce);
			// google.maps.event.addListener(marker, 'click', toggleBounce);
			place.marker = marker;

			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(marker.content);
				infoWindow.open(map, this);
				toggleBounce(marker);
			});

		});
		map.fitBounds(bounds);

	}

	function toggleBounce(marker) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		window.setTimeout(function() {
			marker.setAnimation(null);
		}, 2100);
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
		self.search = function(value) {
			self.placeArray([]);
			for(var x in PlaceData) {
				if(PlaceData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
				{
					self.placeArray.push(PlaceData[x]);
					PlaceData[x].marker.setVisible(true);
				}
				else PlaceData[x].marker.setVisible(false);
			}
		};
		self.query.subscribe(self.search);

		self.select = function(loc){
			self.place(loc);
			var myLatLng = new google.maps.LatLng(self.place().lat, self.place().lng);
			var newCenter = new google.maps.LatLng(self.place().lat, self.place().lng);
			map.panTo(newCenter);
			google.maps.event.trigger(loc.marker, 'click');
		};

	};
	//Calls the initializeMap() function when the page loads
	// window.addEventListener('load', initMap);

	// Let's get this started
	ko.applyBindings(new viewModel());

	function googleError() {
		alert('Google Failed');
	}