/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const testimonialsSwiper = new Swiper('.swiper.testimonials__collection', {

	speed: 700,
	slidesPerView: 1,
	spaceBetween: 20,
	/* loop: true,
	loopedSlides: 10,
	centeredSlides: true, */

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
