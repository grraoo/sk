
/* modal */
var T = 'toggle';
var changeClass = function (item, myClass, flag) {
	if(flag == 'toggle') {
		item.classList.toggle(myClass);
	} else if(flag) {
		item.classList.add(myClass);
	} else {
		item.classList.remove(myClass);
	}
};

/*
вытаскиваем конент из шаблона
*/
var template = document.querySelector('#template').content || document.querySelector('#template');
var modal;


/* 
открываем/закрыываем модалку
*/
var openModal = function (e) {
	/**
	 * проверяем, что кликнули по нужной кнопке
	 */
	var btn = e.target;
	if (btn.classList.contains('js-modalOpen')) {
		var title = btn.dataset.title;
		modal = template.querySelector(btn.dataset.target).cloneNode(true);

		if (btn.dataset.video) {
			/**
			 * видео отзыв
			 * достаем нужную модалку по id
			 * для iframe собираем src
			 */
			modal.querySelector('#videoFrame').src = 'https://www.youtube.com/embed/' + btn.dataset.video + '?ecver=2';

			/**
			 * выводим в DOM
			 */
		} else if (btn.dataset.imgs) {
			/**
			 * картинки проектов
			 */
			var images = btn.dataset.imgs.split(', ');
			/**
			 * генерируем слайдер
			 */
			var slides = [];
			images.forEach(function (img, i) {
				var slideImg = new Image();
				slideImg.src = img;
				slides[i] = slideImg;
			});
			var imgSlider = modal.querySelector('.modal__content');

			slides.forEach(function (img) {
				var imgWrap = document.createElement('div');
				changeClass(imgWrap, 'modal__img-wrap', 1);
				imgWrap.appendChild(img);
				imgSlider.appendChild(imgWrap);
			});

			modal.querySelector('.section-header').innerText = title;

		} else {
			/**
			 * модалка с формой
			 */

			e.preventDefault();
			/**
			 * тут, до вставки в DOM можно например добавлять нужные инпуты или атрибуты форме, для идентификации
			 */
			modal.querySelector('.section-header').innerText = title;
		}
		// document.body.style.position = 'fixed';
		// document.body.style.width = '100vw';
		modal = document.body.appendChild(modal);

		/**
		 * инициализируме слайдер, если открыли картинки проектов
		 */
		if(modal.id = 'imgs') {
			$('.modal__content').slick({
				arrows: true,
				dots: false,
				slidesToShow:1,
				slidesToScroll:1,
				infinite: true
			})
		}
	} else if (btn.classList.contains('modal__close')) {
		/**
		 * закрываем открытую модалку
		 */
		console.log(modal);
		console.log('close');
		document.body.removeChild(modal);
		// document.body.style.position = 'static';
		// document.body.style.width = 'initial';
	}
};

document.addEventListener('click', openModal, true);

var showMore = document.querySelector('.js-show-more');
var hiddenProjects = document.querySelectorAll('.portfolio__item--hidden');
var btnHidden = document.querySelector('.btn--hidden');
var started = false;

/**
* открываем по три проекта в портфолио за раз
 */
var showRecent = function(e) {
	if(hiddenProjects) {
		if(!started) {
			projectsToShow = [].slice.call(hiddenProjects);
		}
		for(var i = 0; i < 3; i++) {
			if(projectsToShow[0] ){
				changeClass(projectsToShow[0], 'portfolio__item--hidden', 0);
			} else {
				changeClass(showMore, 'btn--hidden', 1);
			}
			projectsToShow.splice(0, 1);
			console.log(projectsToShow.length);
		}
		changeClass(btnHidden, 'btn--hidden', 0);
		started = true;
	}
}
/**
 * прячем все открытые выше проекты
 */
var hideRecent = function(e) {
	if(hiddenProjects) {
		for(i = 0; i < hiddenProjects.length; i++) {
			changeClass(hiddenProjects[i], 'portfolio__item--hidden', 1);
		}
		changeClass(btnHidden, 'btn--hidden', 1);
		started = false;
		changeClass(showMore, 'btn--hidden', 0);
	}
}

showMore.addEventListener('click', showRecent);
btnHidden.addEventListener('click', hideRecent);

var menu = document.querySelector('.main-menu');
var menuSwitch = menu.querySelector('.main-menu__switch');
var callbackBlock = document.querySelector('.callback');

var switchMenu = function(e) {
	changeClass(e.target, 'main-menu__switch--opened', T);
	changeClass(menu, 'main-menu--opened', T);

}

/**
 * засовываем на маленьких экранах кнопку обратного зваонка в меню
 */
var moveCallback = function() {
	if(window.innerWidth < 601) {
		menu.appendChild(callbackBlock);
	} else {
		menu.parentElement.insertBefore(callbackBlock, null);
		
	}
};

window.addEventListener('resize', moveCallback);
menuSwitch.addEventListener('click', switchMenu);

moveCallback();

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
				slidesToShow: 2,
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
		responsive: adoptSlider,
		pauseOnHover: true,
		draggable: false
	});

	$('.thanks__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: adoptSlider,
		pauseOnHover: true
		
	});
	
	$('.trust__wrap').slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: adoptSlider4,
		pauseOnHover: true
		
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

			currentPrice = calcList.querySelector('.calculator-list__item--' + item + ' .price span');

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
