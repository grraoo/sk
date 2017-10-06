/*
вытаскиваем конент из шаблона
*/
var template = document.querySelector('#template').content || document.querySelector('#template');
var modal;
var offsetTop;
var offsetX;

var onFormSend =  function() {
	$(".feedback__form").submit(function () { // пeрeхвaтывaeм всe при сoбытии oтпрaвки
		var form = $(this); // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
		var butt = form.find('.feedback__btn');

			var data = form.serialize(); // пoдгoтaвливaeм дaнныe
			$.ajax({ // инициaлизируeм ajax зaпрoс
				type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
				url: 'form_handler.php', // путь дo oбрaбoтчикa
				dataType: 'json', // oтвeт ждeм в json фoрмaтe
				data: data, // дaнныe для oтпрaвки
				beforeSend: function (data) { // сoбытиe дo oтпрaвки
					butt.attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
				},
				success: function (data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
					form[0].reset();
					if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
						alert(data['error']); // пoкaжeм eё тeкст
					} else { // eсли всe прoшлo oк
						butt.prop('disabled', false);
						if(modal) {
							document.body.removeChild(modal);
						}
					}
					modal = template.querySelector('#thanks').cloneNode(true);
					document.body.appendChild(modal);
					offsetTop = window.pageYOffset;
					offsetX = window.pageXOffset;
					document.body.style.top = '-' + offsetTop + 'px';
					document.body.style.position = 'fixed';
					document.body.style.width = '100vw';
				},
				error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
					alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
					alert(thrownError); // и тeкст oшибки
				},
				complete: function(data) { // сoбытиe пoслe любoгo исхoдa
					butt.prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
				}
			});

		return false; // вырубaeм стaндaртную oтпрaвку фoрмы
	});
};


/**
 * для запуска слайдов с картинками в модалке портфолио
 */
var initSlickOnPortfolio = function() {
	$('.project-info__main-slider').on('init', function(){
		$('.project-info__thumbs-slider').slick({
			arrows: true,
			dots: false,
			slidesToShow: 5,
			slidesToScroll: 1,
			draggable: true,
			infinite: true,
			focusOnSelect: true,
			asNavFor: '.project-info__main-slider'
		})
	}).slick({
		arrows: false,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
		asNavFor: '.project-info__thumbs-slider'
	})
};


/**
 * Работаем с классами
 * @param item Dom-node
 * @param myClass string - класс
 * @param flag string/bool
 *
 */
var T = 'toggle';
var changeClass = function (item, myClass, flag) {
	if (flag == 'toggle') {
		item.classList.toggle(myClass);
	} else if (flag) {
		item.classList.add(myClass);
	} else {
		item.classList.remove(myClass);
	}
};

/**
 * https://gist.github.com/topsite-studio/188d4ff4d6c34e1358139078991a86e9
 * При прокрутке страницы делаем навбар тёмным
 */

var fixMenu = function () {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var navObject = document.querySelector('.header-top');
	var navActiveClass = 'header-top--dark';
	var offset_top = 200;
	if (scrolled > offset_top) {
		changeClass(navObject, navActiveClass, 1);
	} else {
		changeClass(navObject, navActiveClass, 0);
	}
};
window.addEventListener('scroll', fixMenu);
fixMenu();

var fixBody = function() {

  document.body.style.top = '-' + offsetTop + 'px';
  document.body.style.position = 'fixed';
  document.body.style.width = '100vw';
};

var unfixBody = function(x, y) {
	document.body.style.position = 'relative';
  document.body.style.width = 'initial';
  document.body.style.top = 'auto';
  window.scrollTo(x, y);
};
