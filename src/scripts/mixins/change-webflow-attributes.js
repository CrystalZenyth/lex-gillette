
function changeWebflowAttributes() {
	const navigationHeader = document.querySelector('[data-name="navigation-header"]');
	const dispatchReports = document.querySelectorAll('.w-form-done, .w-form-fail');
	document.querySelector('html').setAttribute('lang', 'en');
	dispatchReports.forEach((report) => {
		setTimeout(() => {
			report.removeAttribute('tabindex');
			report.setAttribute('role', 'status');
			report.removeAttribute('aria-label');
		}, 1000);
	});
	navigationHeader.removeAttribute('role');
}

changeWebflowAttributes();
document.addEventListener('DOMContentLoaded ', changeWebflowAttributes);
