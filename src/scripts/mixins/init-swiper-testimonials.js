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
		},
		/* slideChange: blabla, */
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

function blabla() {
	const swiperNotification = document.querySelector('.swiper-notification ');
	const activeSlide = document.querySelector('.swiper-slide.swiper-slide-active .testimonials__item-text');
	const activIndex = testimonialsSwiper.activeIndex;
	const slides = document.querySelectorAll('.swiper-slide');
	if (swiperNotification && swiperNotification.getAttribute !== 'polite') {
		swiperNotification.setAttribute('aria-live', 'polite');
	}
	slides.forEach((slide, index) => {
		if (slide.getAttribute('id') === `slide-${activIndex}` && swiperNotification) {
			swiperNotification.textContent = slide.textContent;
		}
	});
}

testimonialsSwiper.on('slideChange', blabla);
