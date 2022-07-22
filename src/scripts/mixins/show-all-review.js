
let countVisibleString;

function addAriaAttribites() {
	const buttonsShoWHide = document.querySelectorAll('[data-name="show-hide"]');
	buttonsShoWHide.forEach((button) => {
		const slideID = button.closest('.swiper-slide').getAttribute('id');
		button.setAttribute('aria-controls', slideID);
	});
}
addAriaAttribites();

function showOrhiddeContent(e) {
	if (e.target.classList.contains('testimonials__item-link')) {
		/* const currentSlide = e.target.closest('.swiper-slide'); */
		const currentText = e.target.previousSibling;
		const currentTextMaxHeight = currentText.scrollHeight;
		const computedStyle = getComputedStyle(currentText);
		const computedLineHeight = +computedStyle.lineHeight.slice(0, -2);
		const currentTextMinHeight = Math.ceil(computedLineHeight * countVisibleString);
		e.target.classList.toggle('js--open');

		if (e.target.classList.contains('js--open')) {
			currentText.style.height = `${currentTextMinHeight}px`;
			setTimeout(() => {
				currentText.style.height = `${currentTextMaxHeight}px`;
				e.target.textContent = 'Hide more';
				e.target.setAttribute('aria-expanded', true);
				e.target.setAttribute('aria-expanded', true);
			}, 10);
		} else {
			currentText.style.height = `${currentTextMinHeight}px`;
			e.target.textContent = 'Show more';
			e.target.setAttribute('aria-expanded', false);
		}
	}
}

document.addEventListener('click', showOrhiddeContent);

function hideButtons() {
	const contentsTestimonials = document.querySelectorAll('.testimonials__item-text');

	contentsTestimonials.forEach((paragraph) => {
		// eslint-disable-next-line no-param-reassign
		paragraph.style.height = '';
		const computedStyle = getComputedStyle(paragraph);
		const computedLineHeight = +computedStyle.lineHeight.slice(0, -2);
		const computedHeight = paragraph.scrollHeight;
		const maxVisibleHeight = Math.ceil(computedLineHeight * countVisibleString);
		// eslint-disable-next-line no-param-reassign
		paragraph.style.WebkitLineClamp = countVisibleString;

		if (computedHeight <= maxVisibleHeight) {
			paragraph.nextSibling.classList.add('js--hidden');
		} else {
			paragraph.nextSibling.classList.remove('js--hidden');
		}
	});
}

function changeCountVisibleString() {
	const screenWidth = window.innerWidth;
	// eslint-disable-next-line no-undef
	if (screenWidth >= BREAKPOINTS.desktop_standart) {
		countVisibleString = 7;
	// eslint-disable-next-line no-undef
	} else if (screenWidth < BREAKPOINTS.desktop_standart && screenWidth >= BREAKPOINTS.tablet) {
		countVisibleString = 9;
	// eslint-disable-next-line no-undef
	} else if (screenWidth < BREAKPOINTS.tablet && screenWidth >= BREAKPOINTS.mob_portrait) {
		countVisibleString = 7;
	// eslint-disable-next-line no-undef
	} else if (screenWidth < BREAKPOINTS.mob_portrait) {
		countVisibleString = 5;
	}
	hideButtons();
}
changeCountVisibleString();
window.addEventListener('resize', changeCountVisibleString);
