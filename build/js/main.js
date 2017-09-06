$(document).ready(function () {

	var adoptSlider = [
		{
			breakpoint: 1000,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	];
	var adoptSlider4 = [
		{
			breakpoint: 1000,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	];
	$('.projects__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: adoptSlider
	});

	$('.thanks__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: adoptSlider
	});
	
	$('.trust__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: adoptSlider4
	});


	$('.compare__slider').slick({
		arrows: false,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		swipe: false,
		speed: 500
	});

	$('.compare__slider-item--control .compare__item').click(function(e) {
		$('.compare__slider').slick('slickGoTo', e.currentTarget.dataset.number);
	});
	$('.compare__back').click(function(e) {
		$('.compare__slider').slick('slickGoTo', 0);
	});
});

$('.scroll-btn--top').click(function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('body').position().top
	}, 2000);
});

$('.scroll-btn--down').click(function(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $(e.target.getAttribute('href')).position().top
	}, 2000);
});

$('.main-menu__link').click(function(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $(e.target.getAttribute('href')).position().top
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
		[21000, 19000, 16000], //1 этаж
		[17000, 15000, 13000] //2 этажа
	],
	build: [
		[6000, 5000, 4000], //1 этаж
		[5500, 3500, 2500] //2 этажа
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
	var index = 0;

	floorNum = calcForm.floors.value;
	if (calcForm.square.value > 0) {
		calcForm.square.classList.remove('text-input--error');
		calcForm.square.parentNode.dataset.error = '';
		for (item in calcConfig) {
			index = calcForm[item].value;

			currentContent = calcList.querySelector('.calculator-list__item--' + item + ' .list-content');

			if (currentContent) {
				currentContent.innerText = calcForm[item][index].innerText;
			}

			currentPrice = calcList.querySelector('.calculator-list__item--' + item + ' .price');

			curValue = parseInt(calcForm.square.value * calcConfig[item][floorNum][index], 10);

			currentPrice.innerHTML = spaces(curValue.toString()) + ' &#8381;';
			totalSum += curValue;

		}
	} else {
		calcForm.square.classList.add('text-input--error');
		calcForm.square.focus();
		calcForm.square.parentNode.dataset.error = calcForm.square.validationMessage;
	}
	calcForm.querySelector('#calcSum').innerHTML = spaces(totalSum.toString()) + ' &#8381;';
};

calculatePrice();

calcForm.addEventListener('input', calculatePrice);
calcForm.addEventListener('reset', function (e) {
	var timerId = setTimeout(function () {
		calculatePrice();
		clearTimeout(timerId);
	}, 100);
});
