'use strict';

var openFeedback = document.querySelector('#open-feedback');
var openBuy = document.querySelector('#open-buy');
var buy = document.querySelector('#buy');
var feedback = document.querySelector('#feedback');
var closeFeedback = feedback.querySelector('#close-feedback');
var form = feedback.querySelector('form');
var login = form.querySelector('[name=login]');
var email = form.querySelector('[name=email]');
var comment = form.querySelector('[name=comment]');
var storage = localStorage.getItem('login');

console.log(login);

var openPopup = function () {
	feedback.classList.toggle('hidden');
	if(storage) {
		login.value = storage;
		email.focus();
	} else {
		login.focus();
	}
};
var closePopup = function () {
	feedback.classList.toggle('hidden');
	feedback.classList.remove('error');
};

openFeedback.addEventListener('click', function (evt) {
	evt.preventDefault();
	openPopup();
});
openFeedback.addEventListener('keydown', function (evt) {
	if(utils.isActivationEvent(evt)) {
		evt.preventDefault();
		openPopup();
	}
});
closeFeedback.addEventListener('click', function (evt) {
	closePopup();
});
closeFeedback.addEventListener('keydown', function (evt) {
	if(utils.isActivationEvent(evt)) {
		evt.preventDefault();
		closePopup();
	}
});
form.addEventListener('submit', function (evt) {
	if(!login.value || !email.value) {
		evt.preventDefault();
		feedback.classList.remove('error');
		feedback.offsetWidth;
		feedback.classList.add('error');
	} else {
		localStorage.setItem('login', login.value);
	}
});
window.addEventListener('keydown', function (evt) {
	if(utils.isDeactivationEvent(evt)) {
		if(!feedback.classList.contains('hidden')) {
			closePopup();
		}
	}
});
