

function addIDForDialogs() {
	const buttonsDialogClose = document.querySelectorAll('.dialog-close');

	buttonsDialogClose.forEach((button) => {
		const currentSlug = button.getAttribute('slug');
		const currentDialog = button.closest('[data-name="popup-wrapper"]');
		currentDialog.setAttribute('id', currentSlug);
	});
}

addIDForDialogs();
