'use strict';

var slide = ( function () {
	var slider = document.querySelector('#slider');
	var slides = slider.querySelectorAll('.slider__slide');
	var slideControls = slider.querySelectorAll('#slider__controls .slider__control');
	var currentSlide = 0;

	var addSlide = function () {
		slides[currentSlide].classList.add('show');
		slideControls[currentSlide].classList.add('slider__control--active');
	};
	var removeSlide = function () {
		slides[currentSlide].classList.remove('show');
		slideControls[currentSlide].classList.remove('slider__control--active');
	};
	var nextSlide = function () {
		removeSlide();
		currentSlide++;
		if (currentSlide >= slides.length) {
			currentSlide = 0;
		}
		addSlide();
	};
	var prevSlide = function () {
		removeSlide();
		currentSlide--;
		if (currentSlide < 0 ) {
			currentSlide = slides.length - 1;
		}
		addSlide();
	};
	var setSlide = function (evt) {
		var sliderBtnSwitch = evt.target;
		if(String(sliderBtnSwitch.id).match('slide-next')) {
			nextSlide();
		} else if(String(sliderBtnSwitch.id).match('slide-prev')) {
			prevSlide();
		}
	};

	slider.addEventListener('click', setSlide);
	slider.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			setSlide(evt);
		}
	});

	var selectSliderControl = function (evt) {
		for(var i = 0; i < slideControls.length; i++) {
			if(evt.target === slideControls[i]) {
				removeSlide();
				currentSlide = i;
				addSlide();
			}
		}
	};

	for(var i = 0; i < slideControls.length; i++) {
		slideControls[i].addEventListener('click', selectSliderControl);
		slideControls[i].addEventListener('keydown', function (evt) {
			if(utils.isActivationEvent(evt)) {
				evt.preventDefault();
				selectSliderControl(evt);
			}
		});
	}
})();
