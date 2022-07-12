
document.addEventListener('DOMContentLoaded', () => {
	const targetEl = document.querySelector('[data-name = "burger-btn"]');
	const body = document.querySelector('body');

	function callback() {
		if (targetEl.classList.contains('w--open')) {
			body.classList.add('overflow-hidden');
		} else {
			body.classList.remove('overflow-hidden');
		}
	}
	const observer = new MutationObserver(callback);
	observer.observe(targetEl, {
		attributes: true,
	});
});
