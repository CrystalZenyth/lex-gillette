

function changeButtonContent() {
	const orderBoxButton = document.querySelector('.order-box__button');
	const buttonContent = document.querySelector('.hidden-box .button__content');

	if (orderBoxButton && buttonContent) {
		orderBoxButton.textContent = '';
		orderBoxButton.append(buttonContent);
	}
}
changeButtonContent();
