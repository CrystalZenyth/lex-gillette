module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: [
		'unicorn',
	],
	rules: {
		'linebreak-style': 0,
		'no-multiple-empty-lines': [1, { max: 2 }],
		indent: [1, 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'unicorn/prefer-add-event-listener': [
			'error', {
				excludedPackages: [
					'koa',
					'sax',
				],
			},
		],
	},
};
