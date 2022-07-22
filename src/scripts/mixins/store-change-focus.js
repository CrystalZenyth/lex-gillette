let IDACTIVECARD;


function changeIdActiveCard(e) {
	const errorMessage = e.target.parentNode.querySelector('[data-node-type="commerce-add-to-cart-error"]');
	if (e.target.classList.contains('w-commerce-commerceaddtocartform')
		&& errorMessage.style.display === 'none') {
		IDACTIVECARD = e.target.getAttribute('data-commerce-product-id');
	}
}

window.addEventListener('submit', changeIdActiveCard);

function getFocusBack(e) {
	if (e.target.closest('[data-node-type="commerce-cart-close-link"]')) {
		const lastActiveForm = document.querySelector(`[data-commerce-product-id="${IDACTIVECARD}"]`);
		const currentInput = lastActiveForm.querySelector('[type="submit"]');
		currentInput.focus();
	}
}

window.addEventListener('click', getFocusBack);

