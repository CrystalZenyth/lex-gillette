function checkPaginationBox() {
	const targetEl = document.querySelector('body');
	function callback() {
		if (targetEl.querySelector('.fs-pagination ul')
      && targetEl.querySelector('.fs-pagination ul').childNodes.length === 1) {
			document.querySelector('.pagination-outer').remove();
		} else if (targetEl.querySelector('.fs-pagination ul') && !targetEl.querySelector('.fs-pagination ul .fs-pagination-active a').hasAttribute('aria-current')) {
			targetEl.querySelector('.fs-pagination ul .fs-pagination-active a').setAttribute('aria-current', 'page');
			console.log(targetEl.querySelector('.fs-pagination ul .fs-pagination-active a').setAttribute('aria-current', 'page'));
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
