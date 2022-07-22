function changeRoleForSlides() {
	const slides = document.querySelectorAll('.swiper-slide');
	slides.forEach((slide) => {
		slide.setAttribute('role', 'listitem');
	});
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
			loop: false,
			on: {
				afterInit() {
					changeRoleForSlides();
				},
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


