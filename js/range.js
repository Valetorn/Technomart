'use strict';

var range = (function () {
	var range = document.querySelector('#range');
	var rangeLine = range.querySelector('.range__line');
	var rangeSubline = rangeLine.querySelector('.range__subline');
	var rangeMin = rangeSubline.querySelector('#range-min');
	var rangeMax = rangeSubline.querySelector('#range-max');
	var max = parseInt(getComputedStyle(rangeLine).width);
	var maxCostValue = 3000;
	var minCostValue = 100;
	var rangeBtnSize = parseInt(getComputedStyle(rangeMin).width);
	var rangeCostMin = range.querySelector('#range-cost-min');
	var rangeCostMax = range.querySelector('#range-cost-max');
	var costCount = (max - rangeBtnSize) / (maxCostValue - minCostValue);
	var currentMinCostValue = parseInt(rangeCostMin.value);
	var currentMaxCostValue = parseInt(rangeCostMax.value);

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
				rangeCostMin.value = Math.round((posL / costCount)) + currentMinCostValue;
			} else if (drag.classList.contains('range__btn--max')) {
				if(posR < 0) {
					posR = 0;
				} else if (posR > (trackCor + max) - thumbMin - rangeBtnSize * 2)  {
					posR =  (trackCor + max) - thumbMin - rangeBtnSize * 2;
				}
				rangeSubline.style.right = posR + 'px';
				rangeCostMax.value = Math.round(-(posR / costCount) + currentMaxCostValue);
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

	rangeCostMin.addEventListener('change', function (evt) {
		if(rangeCostMin.value < minCostValue || rangeCostMin.value === '') {
			rangeCostMin.value = minCostValue;
		} else if (rangeCostMin.value >= rangeCostMax.value - max * 2) {
			return false;
		}
		rangeSubline.style.left = Math.round(parseInt(rangeCostMin.value) * costCount - (costCount * minCostValue))  + 'px';
	});
	rangeCostMax.addEventListener('change', function (evt) {
		if(rangeCostMax.value > maxCostValue || rangeCostMax.value === '') {
			rangeCostMax.value = maxCostValue;
		} else if (rangeCostMax.value <= rangeCostMin.value + max * 2) {
			return false;
		}
		rangeSubline.style.right = Math.round((maxCostValue - parseInt(rangeCostMax.value)) * costCount) + 'px';
	});

	range.addEventListener('mousedown', setCoords);
})();
