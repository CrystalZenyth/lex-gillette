

function openPopup(e) {
	if (e.target.closest('[data-name="button-open-popup"]')) {
		const commonParent = e.target.closest('[data-name="common-parent"]');
		const popupWrapper = commonParent.querySelector('[data-name="popup-wrapper"]');
		/* const popup = commonParent.querySelector('[data-name="popup"]'); */
		const buttonClose = commonParent.querySelector('[data-name="button-close-popup"]');

		popupWrapper.classList.add('js--active');
		buttonClose.focus();
	}
}
function closePopup(e) {
	if (e.target.closest('[data-name="button-close-popup"]') || e.target.classList.contains('popup-wrapper')) {
		const commonParent = e.target.closest('[data-name="common-parent"]');
		const popupWrapper = commonParent.querySelector('[data-name="popup-wrapper"]');
		const buttonOpen = commonParent.querySelector('[data-name="button-open-popup"]');
		popupWrapper.classList.remove('js--active');
		buttonOpen.focus();
	}
}
function closePopupByEsc(e) {
	const isEscKey = e.key === 'Escape' || e.key === 'Esc';

	if (isEscKey) {
		e.preventDefault();
		const activePopup = document.querySelector('.popup-wrapper.js--active');
		if (activePopup) {
			const commonParent = activePopup.closest('[data-name="common-parent"]');
			const popupWrapper = commonParent.querySelector('[data-name="popup-wrapper"]');
			const buttonOpen = commonParent.querySelector('[data-name="button-open-popup"]');
			popupWrapper.classList.remove('js--active');
			buttonOpen.focus();
		}
	}
}

window.addEventListener('click', openPopup);
window.addEventListener('click', closePopup);
window.addEventListener('keydown', closePopupByEsc);

