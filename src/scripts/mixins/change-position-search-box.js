function changePositionSearchBox() {
	const searchForm = document.querySelector('.search-form');
	const blogNavigation = document.querySelector('.blog-navigation__inner');
	const newsNavigation = document.querySelector('.news-navigation');
	const screenWidth = window.innerWidth;

	// eslint-disable-next-line no-undef
	if (screenWidth >= BREAKPOINTS.tablet) {
		blogNavigation.prepend(searchForm);
	} else {
		newsNavigation.after(searchForm);
	}
}
changePositionSearchBox();
window.addEventListener('resize', changePositionSearchBox);
