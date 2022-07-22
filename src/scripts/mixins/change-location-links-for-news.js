

function changeLocationLinks() {
	const tagsList = document.querySelectorAll('.news-category__tags-list');
	const generalListOfLinks = document.querySelector('[data-name="general-list-of-links"]');
	const linkSeparate = document.querySelector('[data-name="separate-link"]');
	const linkSeparateSecondary = document.querySelector('[data-name="separate-link-secondary"]');
	if (generalListOfLinks && linkSeparate && !linkSeparateSecondary) {
		generalListOfLinks.prepend(linkSeparate);
	}
	if (linkSeparateSecondary) {
		if (generalListOfLinks.childNodes.length > 1) {
			generalListOfLinks.parentNode.remove();
		} else {
			generalListOfLinks.append(linkSeparateSecondary);
		}
	}

	tagsList.forEach((list) => {
		const parentCard = list.closest('.news-category__item');
		const parentCardFooter = parentCard.querySelector('.news-category__item-footer');
		parentCardFooter.prepend(list);
		const tagsWrapper = parentCard.querySelector('.news-category__tags-wrapper');
		if (tagsWrapper) {
			tagsWrapper.remove();
		}
	});
}
function checkImpartantСondition() {
	const paginationContainer = document.querySelector('.pagination-container');

	if (!paginationContainer) {
		changeLocationLinks();
	} else {
		const targetEl = paginationContainer;
		// eslint-disable-next-line no-inner-declarations
		function callback() {
			if (targetEl.querySelector('.fs-pagination')) {
				changeLocationLinks();
			}
		}
		const observer = new MutationObserver(callback);
		observer.observe(targetEl, {
			childList: true,
			subtree: true,
			addedNodes: true,
		});
	}
}

checkImpartantСondition();
