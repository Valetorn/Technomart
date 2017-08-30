'use strict';

var toBuy = (function () {
	var productsContainer = document.querySelector('#products-container');
	var buy = document.querySelector('#buy');
	var closeBuy = buy.querySelector('#close-buy');
	var continueShoping = buy.querySelector('#continueShoping');

	var openBuy = function (evt) {
		var buyBtn = evt.target;
		if(String(buyBtn.className).match('product__shopcard-btn')) {
			evt.preventDefault();
			popup.openPopup(buy);
		}
	};

	productsContainer.addEventListener('click', openBuy);
	productsContainer.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			openBuy(evt);
		}
	});
	closeBuy.addEventListener('click', function (evt) {
		popup.closePopup(buy);
	});
	closeBuy.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			popup.closePopup(buy);
		}
	});
	continueShoping.addEventListener('click', function (evt) {
		popup.closePopup(buy);
	});
	continueShoping.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			popup.closePopup(buy);
		}
	});
	window.addEventListener('keydown', function (evt) {
		if(utils.isDeactivationEvent(evt)) {
			if(popup.isPopupOpen(buy)) {
				popup.closePopup(buy);
			}
		}
	});
})();
