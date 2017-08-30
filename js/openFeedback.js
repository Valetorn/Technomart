'use strict';

var openFeedback = ( function () {
	var openFeedback = document.querySelector('#open-feedback');
	var feedback = document.querySelector('#feedback');
	var closeFeedback = feedback.querySelector('#close-feedback');
	var form = feedback.querySelector('form');
	var login = form.querySelector('[name=login]');
	var email = form.querySelector('[name=email]');
	var storage = localStorage.getItem('login');
	var animationError = 'error';

	var setFocus = function () {
		if(storage) {
			login.value = storage;
			email.focus();
		} else {
			login.focus();
		}
	};

	openFeedback.addEventListener('click', function (evt) {
		evt.preventDefault();
		popup.openPopup(feedback);
		setFocus();
	});
	openFeedback.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			popup.openPopup(feedback);
			setFocus();
		}
	});
	closeFeedback.addEventListener('click', function (evt) {
		popup.closePopup(feedback, animationError);
	});
	closeFeedback.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			popup.closePopup(feedback, animationError);
		}
	});
	form.addEventListener('submit', function (evt) {
		if(!login.value || !email.value) {
			evt.preventDefault();
			popup.setAnimation(feedback, animationError);
		} else {
			localStorage.setItem('login', login.value);
		}
	});
	window.addEventListener('keydown', function (evt) {
		if(utils.isDeactivationEvent(evt)) {
			if(popup.isPopupOpen(feedback)) {
				popup.closePopup(feedback, animationError);
			}
		}
	});
})();
