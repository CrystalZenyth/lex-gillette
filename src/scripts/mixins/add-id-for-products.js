

function addIDForButtonInProductCart() {
	const formsProductsElements = document.querySelectorAll('.w-commerce-commerceaddtocartform');
	formsProductsElements.forEach((form) => {
		const productId = form.getAttribute('data-commerce-product-id');
		const buttonAddToCart = form.querySelector('input[type="submit"]');
		const productCart = form.closest('[data-name="product-card"]');
		productCart.setAttribute('id', productId);
		buttonAddToCart.setAttribute('aria-describedby', productId);
	});
}

addIDForButtonInProductCart();
