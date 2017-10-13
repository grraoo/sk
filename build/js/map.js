// Google Maps JS & Settings Coordinates
// When the window has finished loading create our google map below
// https://developers.google.com/maps/documentation/

google.maps.event.addDomListener(window, 'load', init);

function init() {
	// Basic options for a simple Google Map


	//----------------- ADD YOUR SETTINGS HERE -----------------//


	// Add your coordinates. How to know coordinates: https://support.google.com/maps/answer/18539?hl=en
	var myLatlng = new google.maps.LatLng(52.274169, 104.339510);
	var markerLatLng = new google.maps.LatLng(52.268286, 104.342564)


	// Add your company name and some text about company
	var maptooltipbold = 'Строй Комфорт';
	var maptooltip = 'Архитектурно-строительная компания';


	//---------------------------------------------------------//


	var mapOptions = {

		// How zoomed in you want the map to start at (always required)
		zoom: 14,

		// The latitude and longitude to center the map (always required)
		center: myLatlng,
		styles: [


			{elementType: 'labels.text.fill', stylers: [{color: '#000000'}]},

			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{color: '#7fc241'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{color: '#599a42'}]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.stroke',
				stylers: [{color: '#ffffff'}]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{color: '#746855'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{color: '#7fc241'}]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{color: '#3d61ad'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{color: '#000000'}]
			}
		]
	};



	// Get the HTML DOM element that will contain your map
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Image of toogle
	var image = 'img/contacts-map-marker.png';

	// Div's of toogle
	var content = document.createElement('div');
	content.innerHTML = "<div class=" + "map-tooltip" + "><h4><strong>" + maptooltipbold + "</strong></h4><hr>" + "<h5>" + maptooltip + "</h5></div>";

	// Initialize tooltips
	var infowindow = new google.maps.InfoWindow({
		content: content
	});

	var marker = new google.maps.Marker({
		position: markerLatLng,
		map: map,
		draggable: false,
		icon: image
		// ,
		// animation: google.maps.Animation.BOUNCE

	});


	google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, marker);
  });
  console.log('ok');

}
init();
