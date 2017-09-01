$(document).ready(function () {
	$('.projects__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000
	});

	$('.thanks__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 4000
	});

	$('.trust__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 3000
	});
});

$('.scroll-btn--top').click(function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('body').position().top
	}, 2000);
});

// Google Maps JS & Settings Coordinates
// When the window has finished loading create our google map below
// https://developers.google.com/maps/documentation/

google.maps.event.addDomListener(window, 'load', init);

function init() {
	// Basic options for a simple Google Map


	//----------------- ADD YOUR SETTINGS HERE -----------------//


	// Add your coordinates. How to know coordinates: https://support.google.com/maps/answer/18539?hl=en
	var myLatlng = new google.maps.LatLng(52.268155, 104.342619);

	// Add your company name and some text about company
	var maptooltipbold = 'Строй Комфорт';
	var maptooltip = 'Архитектурно-строительная компания';


	//---------------------------------------------------------//


	var mapOptions = {

		// How zoomed in you want the map to start at (always required)
		zoom: 18,

		// The latitude and longitude to center the map (always required)
		center: myLatlng
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
		position: myLatlng,
		map: map,
		draggable: false,
		icon: image
		// ,
		// animation: google.maps.Animation.BOUNCE

	});


	google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, marker);
	});

}

// Calculator

var calcConfig = {
	foundation: [
		[2100, 4500, 6500], //1 этаж
		[1600, 3500, 5500] //2 этажа
	],
	timber: [
		[ //1 этаж
			21000,
			19000,
			16000
		],
		[ //2 этажа
			17000,
			15000,
			13000
		]
	],
	build: [
		[6000, 5000, 4000],
		[5500, 3500, 2500]
	],
	roof: [
		[5500, 6500], //1 этаж
		[4500, 6000] //2 этажа
	],
	windows: [
		[2800, 2200], //1 этаж
		[2500, 1800] //2 этажа
	]
}

var calcForm = document.querySelector('.calculator__form');
var calcList = document.querySelector('.calculator-list');
var buildSelect = calcForm.querySelector('#build');
var timberSelect = calcForm.querySelector('#timber');
var floorNum = 0;

var spaces = function (str) {
	return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

timberSelect.addEventListener('change', function () {
	buildSelect.value = this.value;
});

var calculatePrice = function () {
	var totalSum = 0;
	var curValue = 0;
	floorNum = calcForm.floors.value;

	for (item in calcConfig) {
		curValue = parseInt(calcForm.square.value * calcConfig[item][floorNum][calcForm[item].value], 10);
		totalSum += curValue;
		currentPrice = calcList.querySelector('.calculator-list__item--' + item + ' .price');
		currentPrice.innerHTML = spaces(curValue.toString()) + ' &#8381;';

		currentContent = calcList.querySelector('.calculator-list__item--' + item + ' .list-content');
		if (currentContent) {
			currentContent.innerText = calcForm[item][calcForm[item].value].innerText;
		}
		calcForm.querySelector('#calcSum').innerHTML = spaces(totalSum.toString()) + ' &#8381;';
	}
};

calculatePrice();

calcForm.addEventListener('change', calculatePrice);
calcForm.addEventListener('reset', function (e) {
	var timerId = setTimeout(function () {
		calculatePrice();
		clearTimeout(timerId);
	}, 100);
});

