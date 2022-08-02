

function addAttributesForProducts() {
	const storeHeroID = document.querySelectorAll('[data-name="id-box"]');
	storeHeroID.forEach((box) => {
		const parentBox = box.closest('[data-name="product-card"]');
		const id = `product-${box.textContent}`;
		const infobox = parentBox.querySelector('[data-name="product-name"]');
		infobox.setAttribute('id', id);
		const button = parentBox.querySelector('[data-name="button-add-to-cart"]');
		button.setAttribute('aria-describedby', id);
	});
}

addAttributesForProducts();
