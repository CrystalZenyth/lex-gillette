

function openPopup(e) {
	if (e.target.closest('[data-name="button-open-popup"]')) {
		const commonParent = e.target.closest('[data-name="common-parent"]');
		const popupWrapper = commonParent.querySelector('[data-name="popup-wrapper"]');
		const popup = commonParent.querySelector('[data-name="popup"]');
		popupWrapper.classList.remove('hidden');
		popup.focus();
	}
}
function closePopup(e) {
	if (e.target.closest('[data-name="button-close-popup"]') || e.target.closest('[data-name="popup-wrapper"]')) {
		const commonParent = e.target.closest('[data-name="common-parent"]');
		const popupWrapper = commonParent.querySelector('[data-name="popup-wrapper"]');
		const buttonOpen = commonParent.querySelector('[data-name="button-open-popup"]');
		popupWrapper.classList.add('hidden');
		buttonOpen.focus();
	}
}

window.addEventListener('click', openPopup);
window.addEventListener('click', closePopup);
