function changeOverflowForBody() {
	const body = document.querySelector('body');
	const cartWrapper = document.querySelector('.w-commerce-commercecartwrapper');
	if (cartWrapper.hasAttribute('data-cart-open')) {
		body.classList.add('overflow-hidden');
	} else {
		body.classList.remove('overflow-hidden');
	}
}

function initObserverForBigBasket() {
	const targetEl = document.querySelector('.w-commerce-commercecartwrapper');
	const observerBasket = new MutationObserver(changeOverflowForBody);
	observerBasket.observe(targetEl, {
		attributes: true,
	});
}

initObserverForBigBasket();
