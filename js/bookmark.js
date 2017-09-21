var bookmark = (function () {
	var bookmark = document.querySelector('#bookmarks');
	var productsContainer = document.querySelector('#products-container');
	var bookmarkCounter = document.querySelector('#tab-counter');

	var getBookmarkData = function () {
		return JSON.parse(localStorage.getItem('bookmark'));
	};
	// Записываем данные в LocalStorage
	var setBookmarkData = function (o) {
		localStorage.setItem('bookmark', JSON.stringify(o));
		return false;
	};
	var counter = function (data) {
		var count = 0;
		for(var items in data) {
			count += data[items][1];
			bookmarkCounter.innerHTML = count;
		}
	};
	var setCounter = function () {
		var bookmarkData = getBookmarkData();
		if(bookmarkData !== null) {
			counter(bookmarkData);
		}
	};
	var openBookmark = function (evt) {
		evt.preventDefault();
		if(evt.target.classList.contains('product__tab-btn')) {
			addToBookmark(evt);
		}
	};
	var addToBookmark = function (evt) {
		evt.disabled = true;

		var parentBox = utils.findAncestor(evt.target, '.product');
		var bookmarkData = getBookmarkData() || {};
		var	itemId = evt.target.getAttribute('data-id');
		var	itemTitle = parentBox.querySelector('.product__text').innerHTML;
		if(bookmarkData.hasOwnProperty(itemId)) {
			return false;
		} else {
			bookmarkData[itemId] = [itemTitle, 1];
		}
		if(!setBookmarkData(bookmarkData)) {
			evt.disabled = false;
		}
		counter(bookmarkData);
	};

	setCounter();

	productsContainer.addEventListener('click', function (evt) {
		openBookmark(evt);
	});
	productsContainer.addEventListener('keydown', function (evt) {
		if(utils.isActivationEvent(evt)) {
			openBookmark(evt);
		}
	});
})();
