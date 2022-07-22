
function addLabelforButton() {
	const inputsQuantity = document.querySelectorAll('[data-name="quantity"]');
	inputsQuantity.forEach((input) => {
		const productId = input.getAttribute('data-commerce-sku-id');
		if (input.id !== productId) {
			// eslint-disable-next-line no-param-reassign
			input.id = productId;
			input.insertAdjacentHTML('beforebegin', `<label for="${productId}" class="l">Quantity</label>`);
		}
	});
}

function initObserverForBasket() {
	const targetEl = document.querySelector('.w-commerce-commercecartlist');
	const observerBasket = new MutationObserver(addLabelforButton);
	observerBasket.observe(targetEl, {
		childList: true,
		subtree: true,
		attributes: true,
	});
}

initObserverForBasket();


