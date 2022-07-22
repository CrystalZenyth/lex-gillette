
function focusOnFirstActiveElement(e) {
	if (e.target.tagName === 'A' && e.target.parentNode.classList.contains('fs-pagination-page')) {
		const paginationBox = this;
		const currentCollection = paginationBox.previousElementSibling;
		const currentActiveElement = currentCollection.querySelector('.w-dyn-item[style=""] a');
		currentActiveElement.focus();
	}
}
document.querySelectorAll('.pagination-outer').forEach((paginationBox) => {
	paginationBox.addEventListener('click', focusOnFirstActiveElement);
});


