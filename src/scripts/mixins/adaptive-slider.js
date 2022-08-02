function changeRoleForSlides() {
	const swiperWrapper = document.querySelector('.swiper-wrapper');
	const slides = swiperWrapper.querySelectorAll('.swiper-slide');
	const swiperNotification = swiperWrapper.querySelector('.swiper-notification ');
	swiperWrapper.removeAttribute('aria-live');
	slides.forEach((slide, index) => {
		slide.setAttribute('role', 'listitem');
		slide.setAttribute('id', `slide-${index}`);
	});
	if (swiperNotification) {
		swiperNotification.setAttribute('aria-live', 'polite');
	}
}

function recordNotification() {
	const swiperNotification = document.querySelector('.swiper-notification ');
	// eslint-disable-next-line no-use-before-define
	if (adaptiveSwiper) {
	// eslint-disable-next-line no-use-before-define
	const activIndex = adaptiveSwiper.activeIndex;
		const slides = document.querySelectorAll('.swiper-slide');
		if (swiperNotification && swiperNotification.getAttribute !== 'polite') {
			swiperNotification.setAttribute('aria-live', 'polite');
		}
		slides.forEach((slide) => {
			if (slide.getAttribute('id') === `slide-${activIndex}` && swiperNotification) {
				swiperNotification.textContent = slide.textContent;
			}
		});
	}
}

/* eslint-disable no-undef */


let adaptiveSwiper;
function initSwiper() {
	const screenWidth = window.innerWidth;
	const currentSwiper = document.querySelector('.swiper.news-category__list-wrapper');
	const currentSwiperWrapper = document.querySelector('.swiper-wrapper.news-category__list');
	// eslint-disable-next-line no-undef
	// eslint-disable-next-line max-len
	if (screenWidth < BREAKPOINTS.desktop_standart && adaptiveSwiper === undefined && screenWidth > BREAKPOINTS.mob_portrait) {
		// eslint-disable-next-line no-undef
		adaptiveSwiper = new Swiper('.swiper.news-category__list-wrapper', {
			/* autoHeight: true, */
			speed: 700,
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			on: {
				afterInit() {
					changeRoleForSlides();
				},
				slideChange: recordNotification,
			},
			breakpoints: {
				// when window width is >= 320px
				767: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				991: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
			// Navigation arrows
			navigation: {
				prevEl: '.swiper-button-prev.swiper-button__read-more',
				nextEl: '.swiper-button-next.swiper-button__read-more',
			},
			scrollbar: {
				// el: '.swiper-scrollbar.read-more__scroll-bar',
				el: '.swiper-scrollbar',
				draggable: true,
			},
		});

		// eslint-disable-next-line no-undef
	} else if (
		(screenWidth > BREAKPOINTS.desktop_standart && adaptiveSwiper !== undefined)
		|| (screenWidth < BREAKPOINTS.mob_portrait && adaptiveSwiper !== undefined)) {
		adaptiveSwiper.destroy();
		adaptiveSwiper = undefined;

		currentSwiperWrapper.removeAttribute('style');
		currentSwiper.removeAttribute('style');
	}
}
initSwiper();

window.addEventListener('resize', initSwiper);


/* adaptiveSwiper.on('slideChange', recordNotification); */
