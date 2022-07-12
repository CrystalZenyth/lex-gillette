function toggleMenu(e) {
	const burger = document.querySelector('.menu-button');
	if (e.target.closest('.menu-button')) {
		burger.classList.toggle('js--active');
	}
	if (burger.classList.contains('js--active') && !e.target.closest('.header__navigation') && !e.target.closest('.menu-button')) {
		burger.classList.remove('js--active');
	}
	if (burger.classList.contains('js--active')) {
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = 'visible';
	}
}

document.addEventListener('click', toggleMenu);
