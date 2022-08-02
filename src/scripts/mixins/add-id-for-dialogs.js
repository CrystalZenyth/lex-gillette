

function addIDForDialogs() {
	const buttonsDialogClose = document.querySelectorAll('.dialog-close');

	buttonsDialogClose.forEach((button) => {
		const currentSlug = button.getAttribute('slug');
		const currentDialog = button.closest('[data-name="popup-wrapper"]');
		const dialogContent = currentDialog.querySelector('[data-name="popup"]');
		currentDialog.setAttribute('id', currentSlug);
		dialogContent.setAttribute('aria-labelledby', `dialog-${currentSlug}`);
	});
}

addIDForDialogs();
