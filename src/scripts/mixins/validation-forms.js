

function validationForm(e) {
	const errorClass = 'js--error';
	/* EMAIL VALIDATION - START */
	const inputEmail = this.querySelector('[type="email"]');
	if (inputEmail) {
		e.preventDefault();

		const inputEmailValue = inputEmail.value;
		if (
			inputEmailValue.search(
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
			) === -1
      && inputEmailValue.length === 0
		) {
			e.stopImmediatePropagation();
			inputEmail.classList.add(errorClass);
		} else {
			inputEmail.classList.remove(errorClass);
		}
	}
	/* EMAIL VALIDATION - FINISH */
	/* TEXT  VALIDATION - START */
	const inputsText = this.querySelectorAll('[type="text"], textarea');

	if (inputsText.length > 0) {
		e.preventDefault();

		inputsText.forEach((input) => {
			if (input.hasAttribute('required') && input.value.trim().length === 0) {
				e.stopImmediatePropagation();
				input.classList.add(errorClass);
			} else {
				input.classList.remove(errorClass);
			}
		});
	}
	/* TEXT  VALIDATION - FINISH */
	/* CHECKBOXES VALIDATION - START */
	const inputsCheckbox = this.querySelectorAll('[type="checkbox"][required]');
	if (inputsCheckbox.length > 0) {
		e.preventDefault();

		inputsCheckbox.forEach((checkbox) => {
			if (!checkbox.checked) {
				e.stopImmediatePropagation();
				checkbox.classList.add(errorClass);
			} else {
				checkbox.classList.remove(errorClass);
			}
		});
	}
	/* CHECKBOXES VALIDATION - FINISH */
}


function removeStandardValidation() {
	document.querySelectorAll('form').forEach((form) => {
		form.setAttribute('novalidate', '');
		form.addEventListener('submit', validationForm);
	});
}
removeStandardValidation();
