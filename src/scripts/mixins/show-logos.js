
const btnsShowLogos = document.querySelectorAll('[data-name="button-show-logos"]');
const logosBox = document.querySelectorAll('[data-name="logos-wrapper"]');

function hideLogos(logosWrapper) {
	const logosList = logosWrapper.querySelector('[data-name="logos-list"]');
	const buttonToggleLogos = logosWrapper.querySelector('[data-name="button-show-logos"]');
	buttonToggleLogos.classList.add('js--active');
	buttonToggleLogos.setAttribute('aria-expanded', true);
	const heightfirstStrings = (+getComputedStyle(logosList).gridTemplateRows.split(' ')[0].slice(0, -2)) + (+getComputedStyle(logosList).gridTemplateRows.split(' ')[1].slice(0, -2));
	const sizeGap = (+getComputedStyle(logosList).columnGap.slice(0, -2));
	const countColumn = (+getComputedStyle(logosList).gridTemplateColumns.split(' ').length);

	logosList.style.maxHeight = `${sizeGap + heightfirstStrings}px`;
	const logos = logosList.childNodes;
	logos.forEach((logo, index) => {
		if (index >= (countColumn * 2)) {
			// eslint-disable-next-line no-param-reassign
			logo.classList.add('hidden');
		} else {
			logo.classList.remove('hidden');
		}
	});
}

function showLogos(logosWrapper) {
	const logosList = logosWrapper.querySelector('[data-name="logos-list"]');
	const buttonToggleLogos = logosWrapper.querySelector('[data-name="button-show-logos"]');
	buttonToggleLogos.classList.remove('js--active');
	buttonToggleLogos.setAttribute('aria-expanded', false);
	const logosListHeight = logosList.scrollHeight;
	logosList.style.maxHeight = `${logosListHeight}px`;
	const logos = logosList.childNodes;
	logos.forEach((logo) => {
		// eslint-disable-next-line no-param-reassign
		logo.classList.remove('hidden');
	});
}

function toggleLogos() {
	const button = this;
	const logosWrapper = button.closest('[data-name="logos-wrapper"]');
	if (button.classList.contains('js--active')) {
		showLogos(logosWrapper);
	} else {
		hideLogos(logosWrapper);
	}
}

btnsShowLogos.forEach((button) => {
	button.addEventListener('click', toggleLogos);
});
function hideAllLogos() {
	logosBox.forEach((logosWrapper) => {
		hideLogos(logosWrapper);
	});
}
hideAllLogos();

window.addEventListener('resize', hideAllLogos);
