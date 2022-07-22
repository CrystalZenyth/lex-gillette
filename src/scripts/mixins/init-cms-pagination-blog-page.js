function initCmsPagination() {
	// create a new Library instance and store it in a variable called "projectsGrid"
	// eslint-disable-next-line no-undef
	const projectsGrid = new FsLibrary('.blog-collection__list');

	// run loadmore on our instance
	projectsGrid.loadmore({
		button: '.load-more-button',
		resetIx: true,
		loadAll: true,
		paginate: {
			enable: true,
			itemsPerPage:
			/* кол-во элементов на странице в зависимости от ширины экрана (не меняются по ресайзу) */
        // eslint-disable-next-line no-nested-ternary
        window.innerWidth > 1279 ? 6 : window.innerWidth > 768 ? 6 : 6,
			insertPagination: '.pagination-container',
			bgColor: 'transpaerent',
			bgColorActive: 'transpaerent',
			textColor: '#626C7C',
			textColorActive: '#831B15',
			borderColor: 'transparent',
		},
		animation: {
			enable: true,
			effects: 'fade',
			duration: 400,
		},
	});
}

initCmsPagination();


