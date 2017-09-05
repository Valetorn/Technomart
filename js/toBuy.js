'use strict';

var toBuy = (function () {
	var productsContainer = document.querySelector('#products-container');
	var allProducts = document.querySelectorAll('.product');
	var buy = document.querySelector('#buy');
	var closeBuy = buy.querySelector('#close-buy');
	var continueShoping = buy.querySelector('#continueShoping');
	var shopingCardCounter = document.querySelector('#shopping-card-counter');
	var cartCont = document.querySelector('#shopingcard-content');
	var template = document.querySelector('#user-choice-template');

	var getCartData = function (){
		return JSON.parse(localStorage.getItem('cart'));
	};
	// Записываем данные в LocalStorage
	var setCartData = function (o){
		localStorage.setItem('cart', JSON.stringify(o));
		return false;
	};
	var openBuy = function (evt) {
		evt.preventDefault();
		addToCart.call(this, evt);
		popup.openPopup(buy);
	};
	// Добавляем товар в корзину
	var addToCart = function (evt) {
		this.disabled = true; // блокируем кнопку на время операции с корзиной

		var cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
		var	itemId = evt.target.getAttribute('data-id');// ID товара
		var	itemTitle = this.querySelector('.product__text').innerHTML; // название товара
		var	itemPrice = this.querySelector('.product__btn').innerHTML; // стоимость товара

		if(cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
			cartData[itemId][2] += 1;
		} else { // если товара в корзине еще нет, то добавляем в объект
			cartData[itemId] = [itemTitle, itemPrice, 1];
		}
		if(!setCartData(cartData)) { // Обновляем данные в LocalStorage
			this.disabled = false; // разблокируем кнопку после обновления LS
		}
	return false;
};

	for (var i = 0; i < allProducts.length; i++) {
		allProducts[i].addEventListener('click', openBuy);
	}

	var openCart = function (evt) {
		var cartData = getCartData(); // вытаскиваем все данные корзины
		var	totalItems = '';
		// если что-то в корзине уже есть, начинаем формировать данные для вывода
		if(cartData !== null) {
			totalItems = '<table class="user-choice__table">\
											<tr class="user-choice__row user-choice__row--head">\
												<th class="user-choice__head user-choice__cell">Наименование</th>\
												<th class="user-choice__head user-choice__cell">Цена</th>\
												<th class="user-choice__head user-choice__cell">Кол-во</th>\
											</tr>';
			for(var items in cartData ){
				totalItems += '<tr class="user-choice__row">';
				for(var i = 0; i < cartData[items].length; i++) {
					totalItems += '<td class="user-choice__cell">' + cartData[items][i] + '</td>';
				}
				totalItems += '</tr>';
			}
			totalItems += '</table>';
			cartCont.innerHTML = totalItems;
		} else {
			// если в корзине пусто, то сигнализируем об этом
			cartCont.innerHTML = '<p class="user-choice__text">В корзине пусто!</p>';
		}
		return false;
};

	/* productsContainer.addEventListener('click', openBuy); */
	document.getElementById('clear_cart').addEventListener('click', function(e){
		localStorage.removeItem('cart');
		cartCont.innerHTML = '<p class="user-choice__text">Корзина очишена.</p>';
	});
	document.querySelector('.user-choice').addEventListener('mouseover', function (evt) {
		var checkoutBtnSwitch = evt.target;
		if(String(checkoutBtnSwitch.id).match('checkout')) {
			document.querySelector('.user-choice__purchases').classList.remove('hidden');
			openCart(evt);
		}
	});
	document.querySelector('.user-choice').addEventListener('mouseleave', function (evt) {
		document.querySelector('.user-choice__purchases').classList.add('hidden');
		openCart(evt);
	});
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
