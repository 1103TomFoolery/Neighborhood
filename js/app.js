	var PlaceData = [
		{	name: "Hanchett-Park Neighborhood",
			description: "My neighborhood",
			lat: "37.325725",
			lng: "121.919379"
		},

		{	name: "Rose Garden",
			description: "Nice place to walk around",
			lat: "37.331122",
			lng: "121.928757"
		},

		{	name: "Tee Nee Thai Restaurant",
			description: "Cute place for Thai food",
			lat: "37.33066",
			lng: "121.914359"
		},

		{	name: "Hoover Theater",
			description: "Landmark theater in Hoover Middle School",
			lat: "37.332834",
			lng: "121.922687"
		},

		{	name: "White Shallot Restaurant",
			description:  "One of our regular spots",
			lat: "37.324013",
			lng: "121.951765"
		},

		{	name: "The Red Stag",
			description: "Classic dive bar",
			lat: "37.323897",
			lng: "121.921966"
		}

	];

	var map;

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: {lat: 37.327, lng: 121.945},
			MapTypeId: google.maps.MapTypeId.ROADMAP
		});
		console.log("initializing map")
	}

	var viewModel = function() {
		var self = this;

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
			}
		};
		self.query.subscribe(search);

		select = function(loc){
			self.place(loc);
			console.log(self.place());
		};

	};
	//Calls the initializeMap() function when the page loads
	window.addEventListener('load', initMap);

	// Let's get this started
	ko.applyBindings(new viewModel());