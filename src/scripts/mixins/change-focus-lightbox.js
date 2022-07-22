/* const linksForLightBox = document.querySelectorAll('.video-box__lightbox');

function changeFocus() {
	const buttonLightboxClose = document.querySelector('.w-lightbox-close');
	if (buttonLightboxClose) {
		const lightboxParent = buttonLightboxClose.closest('.w-lightbox-content');
		lightboxParent.setAttribute('tabindex', 0);
		lightboxParent.focus();
	}
}

linksForLightBox.forEach((link) => {
	link.addEventListener('click', changeFocus);
});


function initObserver() {
	const targetEl = document.querySelector('body');

	function callback2() {
		if (targetEl.querySelector('.w-lightbox-close')) {
			const buttonLightboxClose = document.querySelector('.w-lightbox-close');
			if (document.activeElement === buttonLightboxClose) {
				changeFocus();
			}
		}
	}
	const observer = new MutationObserver(callback2);
	observer.observe(targetEl, {
		attributes: true,
		childList: true,
		subtree: true,
	});
}

initObserver();
 */
