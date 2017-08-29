'use strict';

var toDoRelay = ( function () {
	var relay = document.querySelector('#relay');
	var relayToggles = relay.querySelectorAll('#relay-toggles .relay__toggle');
	var relayContent = relay.querySelectorAll('.relay__content-container div');
	var currentContent = 0;

	var selectRelayContent = function (evt) {
		for(var i = 0; i < relayToggles.length; i++) {
			if(evt.target === relayToggles[i]) {
				relayToggles[currentContent].classList.remove('relay__toggle--active');
				relayContent[currentContent].style.display = 'none';
				currentContent = i;
				relayToggles[currentContent].classList.add('relay__toggle--active');
				relayContent[currentContent].style.display = 'flex';
			}
		}
	};

	for(var i = 0; i < relayToggles.length; i++) {
		relayToggles[i].addEventListener('click', selectRelayContent);
		relayToggles[i].addEventListener('keydown', function (evt) {
			if(utils.isActivationEvent(evt)) {
				evt.preventDefault();
				selectRelayContent(evt);
			}
		});
	}
})();
