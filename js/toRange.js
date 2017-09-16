'use strict';

var toRange = (function () {
	var range = document.querySelector('#range');
	var rangeLine = range.querySelector('.range__line');
	var rangeSubline = rangeLine.querySelector('.range__subline');
	var rangeMin = rangeSubline.querySelector('#range-min');
	var rangeMax = rangeSubline.querySelector('#range-max');
	var max = parseInt(getComputedStyle(rangeLine).width);
	var maxCostValue = 25000;
	var minCostValue = 100;
	var rangeBtnSize = parseInt(getComputedStyle(rangeMin).width);
	var rangeCostMin = range.querySelector('#range-cost-min');
	var rangeCostMax = range.querySelector('#range-cost-max');
	var costCount = (max - rangeBtnSize) / (maxCostValue - minCostValue);

	var getCoords = function (elem) {
		var box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	};

	var setCoords = function (evt) {
		evt.target.classList.add('drag');
		var drag = document.querySelector('.drag');
		var thumbMin = getCoords(rangeMin).left;
		var thumbMax = getCoords(rangeMax).left;
		var trackCor = getCoords(rangeLine).left;
		var curShiftL = evt.pageX - thumbMin;
		var curShiftR = rangeMax.offsetWidth - (evt.pageX - thumbMax);

		var onMouseMove = function (moveEvt) {
			var posL = moveEvt.pageX - trackCor - curShiftL;
			var posR = ((trackCor + max) - moveEvt.pageX) - curShiftR;

			if(drag.classList.contains('range__btn--min')) {
				if(posL < 0) {
					posL = 0;
				} else if (posL > thumbMax - trackCor - rangeBtnSize) {
					posL = thumbMax - trackCor - rangeBtnSize;
				}
				rangeSubline.style.left = posL + 'px';
				rangeCostMin.value = Math.round((posL / costCount)) + minCostValue;
			} else if (drag.classList.contains('range__btn--max')) {
				if(posR < 0) {
					posR = 0;
				} else if (posR > (trackCor + max) - thumbMin - rangeBtnSize * 2)  {
					posR =  (trackCor + max) - thumbMin - rangeBtnSize * 2;
				}
				rangeSubline.style.right = posR + 'px';
				rangeCostMax.value = Math.round(-(posR / costCount) + maxCostValue);
			}
		};
		var onMouseUp = function (upEvt) {
			evt.target.classList.remove('drag');
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	range.addEventListener('mousedown', setCoords);
})();
