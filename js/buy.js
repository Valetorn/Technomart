'use strict';

var buy = (function () {
	var productsContainer = document.querySelector('#products-container');
	var allProducts = productsContainer.querySelectorAll('.product');
	var buy = document.querySelector('#buy');
	var closeBuy = buy.querySelector('#close-buy');
	var continueShoping = buy.querySelector('#continueShoping');
	var shopingCardCounter = document.querySelector('#shopping-card-counter');
	var cartCont = document.querySelector('#shopingcard-content');
	var cart = document.querySelector('#checkout');

	var getCartData = function () {
		return JSON.parse(localStorage.getItem('cart'));
	};
	// Записываем данные в LocalStorage
	var setCartData = function (o) {
		localStorage.setItem('cart', JSON.stringify(o));
		return false;
	};
	var counter = function (data) {
		var count = 0;
		for(var items in data) {
			count += data[items][2];
			shopingCardCounter.innerHTML = count;
			cart.classList.add('user-choice__shopping-card--active');
		}
	};
	var setCounter = function () {
		var cartData = getCartData(); // вытаскиваем все данные корзины
		if(cartData !== null) {
			counter(cartData);
		}
	};
	var clearCart = function () {
		localStorage.removeItem('cart');
		shopingCardCounter.innerHTML = 0;
		cart.classList.remove('user-choice__shopping-card--active');
		cartCont.innerHTML = '<p class="user-choice__text">Корзина очишена.</p>';
	};
	var delProduct = function (evt) {
		evt.preventDefault();
		if(evt.target.classList.contains('user-choice__del-btn')) {
			var itemId = evt.target.getAttribute('data-id');
			var cartData = getCartData();
			if(cartData.hasOwnProperty(itemId)) {
				var tr = utils.findAncestor(evt.target, 'tr');
				tr.parentNode.removeChild(tr);
				shopingCardCounter.innerHTML = parseInt(shopingCardCounter.innerHTML) - cartData[itemId][2];
				delete cartData[itemId];
				setCartData(cartData);
				if(shopingCardCounter.innerHTML === '0') {
					clearCart();
				}
			}
		}
	};
	var openBuy = function (evt) {
		evt.preventDefault();
		if(evt.target.classList.contains('product__shopcard-btn')) {
			addToCart(evt);
			popup.openPopup(buy);
		}
	};
	var setFocus = function (evt) {
		if(evt.target.classList.contains('product')) {
			for(var i = 0; i< allProducts.length; i++) {
				allProducts[i].querySelector('.product__preview').style.display = 'flex';
				allProducts[i].querySelector('.product__btn-container').style.display = 'none';
			}
			evt.target.querySelector('.product__preview').style.display = 'none';
			evt.target.querySelector('.product__btn-container').style.display = 'flex';
		}
	};
	// Добавляем товар в корзину
	var addToCart = function (evt) {
		evt.disabled = true; // блокируем кнопку на время операции с корзиной

		var parentBox = utils.findAncestor(evt.target, '.product');
		var cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
		var	itemId = evt.target.getAttribute('data-id');// ID товара
		var	itemTitle = parentBox.querySelector('.product__text').innerHTML; // название товара
		var	itemPrice = parentBox.querySelector('.product__btn').innerHTML; // стоимость товара
		if(cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
			cartData[itemId][2] += 1;
		} else { // если товара в корзине еще нет, то добавляем в объект
			cartData[itemId] = [itemTitle, itemPrice, 1];
		}
		if(!setCartData(cartData)) { // Обновляем данные в LocalStorage
			evt.disabled = false; // разблокируем кнопку после обновления LS
		}
		counter(cartData);
	};

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
												<th class="user-choice__head user-choice__cell"></th>\
											</tr>';
			for(var items in cartData ) {
				totalItems += '<tr class="user-choice__row">';
				for(var i = 0; i < cartData[items].length; i++) {
					totalItems += '<td class="user-choice__cell">' + cartData[items][i] + '</td>';
				}
				totalItems += '<td class="user-choice__cell user-choice__del"><button class="btn btn--red user-choice__del-btn" data-id="'+ items +'">X</button></td>';
				totalItems += '</tr>';
			}
			totalItems += '</table>';
			cartCont.innerHTML = totalItems;
		} else {
			// если в корзине пусто, то сигнализируем об этом
			cartCont.innerHTML = '<p class="user-choice__text">В корзине пусто!</p>';
		}
	};

	setCounter();

	productsContainer.addEventListener('focus', setFocus, true);
	productsContainer.addEventListener('mouseenter', function (evt) {
		if(evt.target.classList.contains('product')) {
			evt.target.querySelector('.product__preview').style.display = 'none';
			evt.target.querySelector('.product__btn-container').style.display = 'flex';
		}
	}, true);
	productsContainer.addEventListener('mouseleave', function (evt) {
		if(evt.target.classList.contains('product')) {
			evt.target.querySelector('.product__preview').style.display = 'flex';
			evt.target.querySelector('.product__btn-container').style.display = 'none';
		}
	}, true);
	document.querySelector('.user-choice').addEventListener('mouseover', function (evt) {
		var checkoutBtn = evt.target;
		if(String(checkoutBtn.id).match('checkout')) {
			document.querySelector('.user-choice__purchases').classList.remove('hidden');
			openCart(evt);
		}
	});
	cart.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			document.querySelector('.user-choice__purchases').classList.remove('hidden');
			openCart(evt);
		}
	});
	document.querySelector('.user-choice').addEventListener('mouseleave', function (evt) {
		document.querySelector('.user-choice__purchases').classList.add('hidden');
		openCart(evt);
	});
	cartCont.addEventListener('click', function (evt) {
		delProduct(evt);
	});
	cartCont.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			delProduct(evt);
		}
	});
	document.getElementById('clear_cart').addEventListener('click', function(evt) {
		clearCart();
	});
	document.getElementById('clear_cart').addEventListener('keydown', function(evt) {
		if(utils.isActivationEvent(evt)) {
			evt.preventDefault();
			clearCart();
		}
	});
	productsContainer.addEventListener('click', function (evt) {
		openBuy(evt);
	});
	productsContainer.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			openBuy(evt);
			continueShoping.focus();
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
	window.addEventListener('keydown', function (evt) {
		if(utils.isDeactivationEvent(evt)) {
			if(popup.isPopupOpen(document.querySelector('.user-choice__purchases'))) {
				popup.closePopup(document.querySelector('.user-choice__purchases'));
			}
		}
	});
})();
