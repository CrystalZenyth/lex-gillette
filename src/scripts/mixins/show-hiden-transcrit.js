
function showOrHidenContent(e) {
	const modifiedСlass = 'js--active';
	if (
		(e.target.hasAttribute('data-name')
    && e.target.getAttribute('data-name') === 'button-for-hidden-content')
	|| e.target.closest('[data-name="button-for-hidden-content"]')
	) {
		const commonParent = e.target.closest('[data-name="common-parent"]');
		const button = commonParent.querySelector('[data-name="button-for-hidden-content"]');
		const hiddenBoxWrapper = commonParent.querySelector('[data-name="hidden-box_wrapper"]');
		const hiddenBoxInnerHeight = commonParent.querySelector('[data-name="hidden-box_inner"]').scrollHeight;

		if (!button.classList.contains(modifiedСlass)) {
			button.classList.add(modifiedСlass);
			button.setAttribute('aria-expanded', true);
			hiddenBoxWrapper.style.visibility = 'visible';
			hiddenBoxWrapper.style.height = `${hiddenBoxInnerHeight}px`;
		} else {
			button.classList.remove(modifiedСlass);
			button.setAttribute('aria-expanded', false);
			hiddenBoxWrapper.style.height = 0;
			hiddenBoxWrapper.style.visibility = 'hidden';
		}
	}
}

window.addEventListener('click', showOrHidenContent);

function collapseAllHiddenBoxes() {
	const modifiedСlass = 'js--active';
	const buttons = document.querySelectorAll('[data-name="button-for-hidden-content"]');
	const hiddenBoxWrapper = document.querySelectorAll('[data-name="hidden-box_wrapper"]');
	console.log(buttons);
	console.log(hiddenBoxWrapper);


	buttons.forEach((button) => {
		button.classList.remove(modifiedСlass);
	});
	hiddenBoxWrapper.forEach((box) => {
		// eslint-disable-next-line no-param-reassign
		box.style.height = 0;
		// eslint-disable-next-line no-param-reassign
		box.style.visibility = 'hidden';
	});
}

window.addEventListener('resize', collapseAllHiddenBoxes);
