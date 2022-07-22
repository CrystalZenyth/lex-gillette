function changeRoleForSlides() {
	const slides = document.querySelectorAll('.swiper-slide');
	slides.forEach((slide, index) => {
		slide.setAttribute('role', 'listitem');
		slide.setAttribute('id', `slide-${index}`);
	});
}

/* function changeTabIndexForSlides() {
	const buttonsInSliders = document.querySelectorAll('[data-name="show-hide"]');
	const buttonInActiveSlide =
	document.querySelectorAll('.swiper-slide.swiper-slide-active [data-name="show-hide"]');
	buttonsInSliders.forEach((button) => {
		button.setAttribute('tabindex', '-1');
	});
	buttonInActiveSlide.setAttribute('tabindex', '0');
} */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const testimonialsSwiper = new Swiper('.swiper.testimonials__collection', {

	speed: 700,
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	/* loopedSlides: 10, */
	centeredSlides: true,
	on: {
		afterInit() {
			changeRoleForSlides();
			/* changeTabIndexForSlides(); */
		},
	/* slideChange() {
			changeTabIndexForSlides();
		}, */
	},

	breakpoints: {
		467: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
	},
	navigation: {
		prevEl: '.swiper-button-prev.testimonials__swiper-button',
		nextEl: '.swiper-button-next.testimonials__swiper-button',
	},
	scrollbar: {
		el: '.swiper-scrollbar.testimonials__scroll-bar',
		draggable: true,
	},
});

/* testimonialsSwiper.on('slideChange', changeTabIndexForSlides); */

/* realIndexChange */
