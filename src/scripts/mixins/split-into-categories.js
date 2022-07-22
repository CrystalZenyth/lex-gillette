/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
function changeLocationSection() {
	const mainBlock = document.querySelector('[data-name="main-section"]');
	document.querySelector('.news-category--news');
	mainBlock.append(document.querySelector('.news-category--news'));
	mainBlock.append(document.querySelector('.news-category--podcasts'));
	mainBlock.append(document.querySelector('.news-category--broadcast'));
	mainBlock.append(document.querySelector('.news-category--magazines'));
	mainBlock.append(document.querySelector('.news-category--aware-now'));
	document.querySelectorAll('.news-category--secondary').forEach((section) => {
		mainBlock.append(section);
	});
}

function addCardsToYourSections() {
	const newsCards = document.querySelectorAll('[data-name="news-card"]');
	const generalSection = document.querySelector('[data-name="general-section"]');
	newsCards.forEach((card) => {
		const currentCategories = card.querySelectorAll('[data-name="current-category-link"]');
		currentCategories.forEach((category) => {
			const currentCard = card.cloneNode(true);
			const newList = document.querySelector(`[data-category="${category.textContent}"]`);
			newList.append(currentCard);
		});
	});
	generalSection.remove();
	changeLocationSection();
}

function addClassesToSections() {
	const newSections = document.querySelectorAll('[data-name="created-section"]');

	newSections.forEach((section) => {
		const nameSection = section.querySelector('.news-category-title').textContent.toUpperCase();
		switch (nameSection) {
		case 'NEWS':
			section.classList.add('news-category--news');
			section.classList.add('news-category--show-10');
			break;
		case 'PODCASTS':
			section.classList.add('news-category--podcasts');
			section.classList.add('news-category--show-3');
			break;
		case 'BROADCAST':
			section.classList.add('news-category--broadcast');
			section.classList.add('news-category--show-6');
			break;
		case 'MAGAZINES':
			section.classList.add('news-category--magazines');
			section.classList.add('news-category--show-3');
			break;
		case 'AWARE NOW':
			section.classList.add('news-category--aware-now');
			section.classList.add('news-category--show-7');
			break;

		default:
			section.classList.add('news-category--secondary');
			section.classList.add('news-category--show-10');
			break;
		}
	});
	addCardsToYourSections();
}

function splitIntoCategories() {
	const currentCategoryLink = document.querySelectorAll('[data-name="current-category-link"]');
	const mainSection = document.querySelector('[data-name="main-section"]');
	const linkObject = {};
	if (currentCategoryLink) {
		currentCategoryLink.forEach((link) => {
			const categoryName = link.textContent;
			const categoryLink = `${window.location.host}${link.getAttribute('href')}`;
			if (!(categoryName in linkObject)) {
				linkObject[categoryName] = categoryLink;
			}
		});
	}
	for (key in linkObject) {
		mainSection.insertAdjacentHTML(
			'beforeend',
			`
        <section class="section news-category" data-name="created-section">
            <div class="container news-category__container">
                <h2 class="title-xl news-category-title">${key}</h2>
                <div role="list" class="news-category__list" data-category="${key}"></div>
                <a href="${linkObject[key]}" class="button news-category__view-all w-inline-block">
                    <div class="button__content">
                        <p class="button__text">${key}</p>
                        <div class="button__arrow">
                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false" aria-hidden="true">
                                <path d="M0.999999 1.5L15 1.5L15 15.5" stroke="currentColor" stroke-width="2"></path>
                                <path d="M14.7432 1.75924L1.26172 15.2407" stroke="currentColor" stroke-width="2"></path>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        </section>
        `,
		);
	}
	addClassesToSections();
}

splitIntoCategories();
