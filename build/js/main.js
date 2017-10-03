onFormSend();

/* modal */

/*
открываем/закрываем модалку
*/

var openModal = function (e, obj) {
	/**
	 * проверяем, что кликнули по нужной кнопке
	 */
	var btn = obj || e.target;

	 if (btn.classList.contains('js-modalClose') || btn.classList.contains('overlay--active')) {
		/**
		 * закрываем открытую модалку
		 */
		if (modal.id == 'project-modal') {
			$('.project-info__main-slider').slick('destroy');
			$('.project-info__thumbs-slider').slick('destroy');
		}
		document.body.removeChild(modal);
		modal = null;
		
		unfixBody(offsetX, offsetTop);
	} 
	
	if (btn.classList.contains('js-modalOpen')) {
		offsetTop = window.pageYOffset;
		offsetX = window.pageXOffset;
		var title = btn.dataset.title;
		modal = template.querySelector(btn.dataset.target).cloneNode(true);

		if (btn.dataset.video) {
			/**
			 * видео отзыв
			 * достаем нужную модалку по id
			 * для iframe собираем src
			 */
			modal.querySelector('#videoFrame').src = 'https://www.youtube.com/embed/' + btn.dataset.video + '?ecver=2';

		} else if (btn.dataset.imgs) {
			/**
			 * картинки проектов
			 */
			var images = btn.dataset.imgs.split(', ');
			/**
			 * генерируем контент для слайдера
			 */

			var imgSlider = modal.querySelector('.modal__content');
			
			var fragment = document.createDocumentFragment();
			var count = 0;
			var imgsLoaded = false;
			images.forEach(function (img, i) {
				var slideImg = new Image();
				slideImg.src = img;
				var imgWrap = document.createElement('div');
				changeClass(imgWrap, 'modal__img-wrap', 1);
				imgWrap.style.backgroundImage = 'url(' + img + ')';
				fragment.appendChild(imgWrap);
				slideImg.onload = function() {
					count++;
					if(count == images.length) {
						imgsLoaded = true;
					}
				}
			});

			modal.querySelector('.section-header').innerText = title;

		} else if(btn.dataset.house) {
			var houseName = document.createElement('input');
			houseName.setAttribute('type', 'hidden');
			houseName.name = 'house-address';
			houseName.value = btn.dataset.house;
			modal.querySelector('.section-header').innerText = title;
			modal.querySelector('.feedback__form').appendChild(houseName);

		}
		
		else {
			/**
			 * модалка с формой
			 */
			if(e) {
				e.preventDefault();
			}
			/**
			 * тут, до вставки в DOM можно например добавлять нужные инпуты или атрибуты форме, для идентификации
			 */
			modal.querySelector('.section-header').innerText = title;
		}

		fixBody();
		modal = document.body.appendChild(modal);

		onFormSend();

		/**
		 * инициализируме слайдер, если открыли картинки проектов
		 */

		//  project-info__main-slider

		switch(modal.id) {
			case 'reviewModal':
				reviewImg.src = btn.dataset.img;
				break;
			case 'imgs':
				var preloadTimer = setInterval(function() {
					if(imgsLoaded) {
						var preloader = document.querySelector('#floatingBarsG');	
						imgSlider.removeChild(preloader);
						imgSlider.appendChild(fragment);
						if(count > 1) {
							$('#imgs .modal__content').slick({
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true,
								dots: false,
								infinite: true,
								initialSlide: 1
							});
						}
						clearInterval(preloadTimer);
					}
				}, 200)
				break;
			case 'project-modal':
			var projectInfo = btn.querySelector('.portfolio__info').content.querySelector('.project-info') || btn.querySelector('.project-info');
			var modalContent = modal.querySelector('.modal__content');
				modalContent.appendChild(projectInfo.cloneNode(true));
				initSlickOnPortfolio();
				break;
			default: break;
		}
	}
};

document.addEventListener('click', openModal, true);

var showMore = document.querySelector('.js-show-more');
var hiddenProjects = document.querySelectorAll('.portfolio__item--hidden');
var btnHidden = document.querySelector('.btn--hidden');
var started = false;

/**
 * открываем дополнительные проекты в портфолио
 */
var showRecent = function (e) {
	if (hiddenProjects) {
		var numberToShow = 6;

		if(window.innerWidth < 777) {
			numberToShow = 3;
		} else if(window.innerWidth < 1157) {
			numberToShow = 4;
		}

		if (!started) {
			projectsToShow = [].slice.call(hiddenProjects);
		}

		numberToOpen = Math.min(numberToShow, projectsToShow.length);
		for (var i = 0; i < numberToOpen; i++) {
			if (projectsToShow.length) {
				changeClass(projectsToShow[0], 'portfolio__item--hidden', 0);
				projectsToShow.splice(0, 1);
			} 
			if (!projectsToShow.length) {
				changeClass(showMore, 'btn--hidden', 1);
			}
		}
		changeClass(btnHidden, 'btn--hidden', 0);
		started = true;
	}
}
/**
 * прячем все открытые выше проекты
 */
var hideRecent = function (e) {
	if (hiddenProjects) {
		for (i = 0; i < hiddenProjects.length; i++) {
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

var switchMenu = function (e) {
	changeClass(menuSwitch, 'main-menu__switch--opened', T);
	changeClass(menu, 'main-menu--opened', T);
}

/**
 * засовываем на маленьких экранах кнопку обратного зваонка в меню
 */
var moveCallback = function () {
	if (window.innerWidth < 601) {
		menu.appendChild(callbackBlock);
	} else {
		menu.parentElement.insertBefore(callbackBlock, null);
	}
};

window.addEventListener('resize', moveCallback);

menuSwitch.addEventListener('click', switchMenu);

menu.addEventListener('click', function(e) {
		if(e.target != menuSwitch) {
			if(window.innerWidth < 961) {
				switchMenu();
			}
		}
	}
);

moveCallback();

/**
 * Тут все слайдеры
 */
$(document).ready(function () {

	var adoptSlider = [{
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
	var adoptSlider4 = [{
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
	var teamResponsive = [{
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
		},
		{
			breakpoint: 460,
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
		slidesToShow: 5,
		slidesToScroll: 5,
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
		speed: 500,
		adaptiveHeight: true
	});

	$('.compare__slider-item--control .compare__item').click(function (e) {
		$('.compare__slider').slick('slickGoTo', e.currentTarget.dataset.number);
	});
	$('.compare__back').click(function (e) {
		$('.compare__slider').slick('slickGoTo', 0);
	});

	var headSlider = $('#head-slider')

	function playSliderVideo(){
		var currentSlide = headSlider.find('.slick-active')
		currentSlide.find('video')[0].play()
	}

	// headSlider;

	headSlider.on({
		init: playSliderVideo,
		afterChange: playSliderVideo
	}).slick({
		arrows: true,
		dots: false,
		draggable: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		// pauseOnHover: true,
		autoplay: true,
		autoplaySpeed: 7000
	})



	$('.team__wrap').slick({
		arrows: true,
		// dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		speed: 500,
		pauseOnHover: true,
		autoplay: true,
		draggable: false,
		autoplaySpeed: 8000,
		responsive: teamResponsive
	})

});


/**
 * скроллим плавно
 */
$('.scroll-btn--top').click(function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('body').position().top
	}, 2000);
});

$('.scroll-btn--down').click(function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $(e.target.getAttribute('href')).position().top
	}, 2000);
});

$(document).on( 'click', '.js-scroll', function( e ) {
	e.preventDefault();
	var obj = $(e.target.getAttribute('href'));
	$('html, body').animate({
		scrollTop: obj.position().top
	}, 2000);
	if(e.target.dataset.project){
		setTimeout(function () {
				openModal(null, obj[0]);
		}, 2200)
	}
});