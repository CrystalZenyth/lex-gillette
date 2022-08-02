
function skipNavigation(e) {
	e.preventDefault();
	const target = document.querySelector('#main');
	target.setAttribute('tabindex', '-1');
	target.focus();
}

document.querySelector('#skip-link').addEventListener('click', skipNavigation);
