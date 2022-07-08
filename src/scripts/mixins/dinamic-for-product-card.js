

function selectOptions() {
}

selectOptions();


function changeTabindex() {
	const buttonsOption = document.querySelectorAll('[data-name="button-option"]');
	buttonsOption.forEach((button) => {
		button.setAttribute('tabindex', 0);
	});
}

changeTabindex();
