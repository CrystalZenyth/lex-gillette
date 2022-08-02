
function changeFocus(e) {
	const id = e.target.getAttribute('id');
	setTimeout(() => {
		e.target.focus();
		const newTarget = document.getElementById(id);
		newTarget.focus();
	}, 1500);
}

function addLabelforButton() {
	const inputsQuantity = document.querySelectorAll('[data-name="quantity"]');
	inputsQuantity.forEach((input) => {
		const inputId = input.getAttribute('data-commerce-sku-id');
		if (input.id !== inputId) {
			const cartItem = input.closest('.cart-item');
			const buttonClose = cartItem.querySelector('.remove-button');
			const productId = `id-${inputId}`;
			cartItem.id = productId;
			buttonClose.setAttribute('aria-describedby', productId);
			// eslint-disable-next-line no-param-reassign
			input.id = inputId;
			input.insertAdjacentHTML('beforebegin', `<label for="${inputId}" class="l">Quantity</label>`);
		}
	});
	const inputsNumberInCart = document.querySelectorAll('.cart-item__quantity-wrapper input');
	inputsNumberInCart.forEach((input) => {
		const parent = input.parentNode;
		parent.addEventListener('change', changeFocus);
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


