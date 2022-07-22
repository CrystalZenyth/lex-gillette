/* eslint-disable no-console */


const dialogElements = document.querySelectorAll('[data-name="popup-wrapper"]');
const mainEl = document.querySelector('main');

dialogElements.forEach((dialogElement) => {
	// eslint-disable-next-line no-undef
	const dialog = new A11yDialog(dialogElement, mainEl);

	dialog.on('show', (dialogEl, triggerEl) => {
		console.log(dialogEl);
		console.log(triggerEl);
	});
});

