'use strict';

var slider = document.querySelector('#slider');
var slides = slider.querySelectorAll('.slider__slide');
var slideControls = slider.querySelectorAll('#slider__controls .slider__control');
var currentSlide = 0;
 var isKeyboardEvent = function (evt) {
	return typeof evt.keyCode !== 'undefined';
};

slider.addEventListener('click', function (event) {
		var sliderBtnSwitch = event.target;
		if(String(sliderBtnSwitch.id).match('slide-next')) {
			nextSlide();
		} else {
			prevSlide();
		}
});
slider.addEventListener('keydown', function (event) {
	if (isKeyboardEvent(event) && event.keyCode === 13) {
		event.preventDefault();
		var sliderBtnSwitch = event.target;
		if(String(sliderBtnSwitch.id).match('slide-next')) {
			nextSlide();
		} else {
			prevSlide();
		}
	}
});

var nextSlide = function () {
		slides[currentSlide].style.display = 'none';
		slideControls[currentSlide].style.borderWidth = '5px';
		currentSlide++;
		if (currentSlide >= slides.length) {
			currentSlide = 0;
		}
		slides[currentSlide].style.display = 'block';
		slideControls[currentSlide].style.borderWidth = '2px';
}
var prevSlide = function () {
		slides[currentSlide].style.display = 'none';
		slideControls[currentSlide].style.borderWidth = '5px';
		currentSlide--;
		if (currentSlide < 0) {
			currentSlide = slides.length - 1;
		}
		slides[currentSlide].style.display = 'block';
		slideControls[currentSlide].style.borderWidth = '2px';
}
slideControls[currentSlide].style.borderWidth = '2px';
