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
	calcForm.querySelector('#calcSumInput').value = spaces(totalSum.toString()) + ' руб.';
};

calculatePrice();

calcForm.addEventListener('input', calculatePrice);
calcForm.addEventListener('reset', function (e) {
	var timerId = setTimeout(function () {
		calculatePrice();
		clearTimeout(timerId);
	}, 100);
});
