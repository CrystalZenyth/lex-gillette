

/* function changeTitleInTabs() {
	const roleLexTitle = document.querySelector('[data-name="role-lex"]');
	console.log(roleLexTitle);
} */

function initObserverForTabs() {
	const roleLexListBtn = document.querySelector('[data-name="role-list"]');

	const targetEl = roleLexListBtn;
	// eslint-disable-next-line no-inner-declarations
	function changeTitleInTabs() {
		const roleLexTitle = document.querySelector('[data-name="role-lex"]');
		const roleLexActiveBtnText = document.querySelector('[data-name="tabs-button"][aria-selected="true"]').textContent;
		roleLexTitle.textContent = roleLexActiveBtnText;
	}
	const observerTabs = new MutationObserver(changeTitleInTabs);
	observerTabs.observe(targetEl, {
		childList: true,
		subtree: true,
		attributes: true,
	});
}

initObserverForTabs();
