

function showDescriptionProducts(e) {
	if (e.target.closest('[data-name="button-show-description"]')) {
		const productCard = e.target.closest('[data-name="product-card"]');
		const productCardDescriptionBtn = productCard.querySelector('[data-name="button-close-description"]');
		const productCardDescription = productCard.querySelector('[data-name="product-card-description"]');
		const buttonOpenDescription = productCard.querySelector('[data-name="button-show-description"]');
		buttonOpenDescription.setAttribute('aria-expanded', true);
		productCardDescription.classList.add('js--active');

		setTimeout(() => {
			productCardDescriptionBtn.focus();
		}, 300);
	}
}
function closeDescriptionProducts(e) {
	if (e.target.closest('[data-name="button-close-description"]')) {
		const productCard = e.target.closest('[data-name="product-card"]');
		const buttonOpenDescription = productCard.querySelector('[data-name="button-show-description"]');
		const productCardDescription = productCard.querySelector('[data-name="product-card-description"]');
		productCardDescription.classList.remove('js--active');
		buttonOpenDescription.setAttribute('aria-expanded', false);
		buttonOpenDescription.focus();
	}
}


window.addEventListener('click', showDescriptionProducts);
window.addEventListener('click', closeDescriptionProducts);
