

function createFieldsetInShop() {
	const productsItemsparams = document.querySelectorAll('.products-item__params');
	productsItemsparams.forEach((paramsBox) => {
		const paramsParagraph = paramsBox.querySelector('.products-item__params-word');
		const paramsList = paramsBox.querySelector('.products-item__params-list');
		const paramsName = paramsParagraph.textContent;
		paramsParagraph.remove();
		paramsBox.insertAdjacentHTML('afterbegin', `<fieldset class="products-item__params">
    <legend class="products-item__params-word" style="display: contents;">${paramsName}</legend></fieldset>`);
		const legend = paramsBox.querySelector('legend');
		legend.after(paramsList);
		paramsBox.classList.remove('products-item__params');
	});
}

createFieldsetInShop();
