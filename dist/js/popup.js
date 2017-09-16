'use strict';

var popup = ( function () {
	return {
		openPopup: function (popup) {
			popup.classList.toggle('hidden');
		},
		closePopup: function (popup, animation) {
			popup.classList.toggle('hidden');
			if(popup.classList.contains(animation)) {
				popup.classList.remove(animation);
			}
		},
		setAnimation: function (popup, animation) {
			popup.classList.remove(animation);
			popup.offsetWidth;
			popup.classList.add(animation);
		},
		isPopupOpen: function (popup) {
			if(popup.classList.contains('hidden')) {
				return false;
			} else {
				return true;
			}
		}
	};
})();
