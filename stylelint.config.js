module.exports = {
	extends: ['stylelint-config-sass-guidelines', 'stylelint-config-idiomatic-order'],
	plugins: [
		'stylelint-scss',
	],
	rules: {
		'order/properties-alphabetical-order': null,
		'selector-class-pattern': null,
		indentation: 'tab',
	},
};
