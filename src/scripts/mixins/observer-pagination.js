function checkPaginationBox() {
	const targetEl = document.querySelector('body');
	function callback() {
		if (targetEl.querySelector('.fs-pagination ul')
      && targetEl.querySelector('.fs-pagination ul').childNodes.length === 1) {
			document.querySelector('.pagination-outer').remove();
		}
	}
	const observer = new MutationObserver(callback);
	observer.observe(targetEl, {
		attributes: true,
		childList: true,
		subtree: true,
	});
}
checkPaginationBox();
