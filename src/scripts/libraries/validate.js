function addRequired() {
	const elementsForms = document.querySelectorAll('[aria-required="true"]');
	const zipCodeFields = document.querySelectorAll('[autocomplete="postal-code"]');
	const searchFields = document.querySelector('#search');
	elementsForms.forEach((elementForm) => {
		elementForm.setAttribute('required', true);
	});
	zipCodeFields.forEach((elementForm) => {
		elementForm.setAttribute('type', 'number');
		elementForm.setAttribute('minlength', '5');
		elementForm.setAttribute('maxlength', '5');
	});
	if (searchFields) {
		searchFields.setAttribute('name', 'search');
		searchFields.setAttribute('type', 'search');
	}
}
addRequired();
/* eslint-disable */
/*!
 * jQuery Validation Plugin v1.19.5
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2022 Jörn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(($) => {
	$.extend($.fn, {

		// https://jqueryvalidation.org/validate/
		validate(options) {
			// If nothing is selected, return nothing; can't chain anyway
			if (!this.length) {
				if (options && options.debug && window.console) {
					console.warn("Nothing selected, can't validate, returning nothing.");
				}
				return;
			}

			// Check if a validator for this form was already created
			let validator = $.data(this[0], 'validator');
			if (validator) {
				return validator;
			}

			// Add novalidate tag if HTML5.
			this.attr('novalidate', 'novalidate');

			validator = new $.validator(options, this[0]);
			$.data(this[0], 'validator', validator);

			if (validator.settings.onsubmit) {
				this.on('click.validate', ':submit', function (event) {
					// Track the used submit button to properly handle scripted
					// submits later.
					validator.submitButton = event.currentTarget;

					// Allow suppressing validation by adding a cancel class to the submit button
					if ($(this).hasClass('cancel')) {
						validator.cancelSubmit = true;
					}

					// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ($(this).attr('formnovalidate') !== undefined) {
						validator.cancelSubmit = true;
					}
				});

				// Validate the form on submit
				this.on('submit.validate', (event) => {
					if (validator.settings.debug) {
						// Prevent form submit to be able to see console output
						event.preventDefault();
					}

					function handle() {
						let hidden; let
							result;

						// Insert a hidden input as a replacement for the missing submit button
						// The hidden input is inserted in two cases:
						//   - A user defined a `submitHandler`
						//   - There was a pending request due to `remote` method and `stopRequest()`
						//     was called to submit the form in case it's valid
						if (validator.submitButton && (validator.settings.submitHandler || validator.formSubmitted)) {
							hidden = $("<input type='hidden'/>")
								.attr('name', validator.submitButton.name)
								.val($(validator.submitButton).val())
								.appendTo(validator.currentForm);
						}

						if (validator.settings.submitHandler && !validator.settings.debug) {
							result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
							if (hidden) {
								// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if (result !== undefined) {
								return result;
							}
							return false;
						}
						return true;
					}

					// Prevent submit for invalid forms or custom submit handlers
					if (validator.cancelSubmit) {
						validator.cancelSubmit = false;
						return handle();
					}
					if (validator.form()) {
						if (validator.pendingRequest) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					}
					validator.focusInvalid();
					return false;
				});
			}

			return validator;
		},

		// https://jqueryvalidation.org/valid/
		valid() {
			let valid; let validator; let
				errorList;

			if ($(this[0]).is('form')) {
				valid = this.validate().form();
			} else {
				errorList = [];
				valid = true;
				validator = $(this[0].form).validate();
				this.each(function () {
					valid = validator.element(this) && valid;
					if (!valid) {
						errorList = errorList.concat(validator.errorList);
					}
				});
				validator.errorList = errorList;
			}
			return valid;
		},

		// https://jqueryvalidation.org/rules/
		rules(command, argument) {
			const element = this[0];
			const isContentEditable = typeof this.attr('contenteditable') !== 'undefined' && this.attr('contenteditable') !== 'false';
			let settings; let staticRules; let existingRules; let data; let param; let
				filtered;

			// If nothing is selected, return empty object; can't chain anyway
			if (element == null) {
				return;
			}

			if (!element.form && isContentEditable) {
				element.form = this.closest('form')[0];
				element.name = this.attr('name');
			}

			if (element.form == null) {
				return;
			}

			if (command) {
				settings = $.data(element.form, 'validator').settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules(element);
				switch (command) {
				case 'add':
					$.extend(existingRules, $.validator.normalizeRule(argument));

					// Remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[element.name] = existingRules;
					if (argument.messages) {
						settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
					}
					break;
				case 'remove':
					if (!argument) {
						delete staticRules[element.name];
						return existingRules;
					}
					filtered = {};
					$.each(argument.split(/\s/), (index, method) => {
						filtered[method] = existingRules[method];
						delete existingRules[method];
					});
					return filtered;
				}
			}

			data = $.validator.normalizeRules($.extend(
				{},
				$.validator.classRules(element),
				$.validator.attributeRules(element),
				$.validator.dataRules(element),
				$.validator.staticRules(element),
			), element);

			// Make sure required is at front
			
			if (data.required) {
				

				param = data.required;
				delete data.required;
				data = $.extend({ required: param }, data);
			}

			// Make sure remote is at back
			if (data.remote) {
				param = data.remote;
				delete data.remote;
				data = $.extend(data, { remote: param });
			}

			return data;
		},
	});

	// JQuery trim is deprecated, provide a trim method based on String.prototype.trim
	const trim = function (str) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim#Polyfill
		return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};

	// Custom selectors
	$.extend($.expr.pseudos || $.expr[':'], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

		// https://jqueryvalidation.org/blank-selector/
		blank(a) {
			return !trim(`${$(a).val()}`);
		},

		// https://jqueryvalidation.org/filled-selector/
		filled(a) {
			const val = $(a).val();
			return val !== null && !!trim(`${val}`);
		},

		// https://jqueryvalidation.org/unchecked-selector/
		unchecked(a) {
			return !$(a).prop('checked');
		},
	});

	// Constructor for validator
	$.validator = function (options, form) {
		this.settings = $.extend(true, {}, $.validator.defaults, options);
		this.currentForm = form;
		this.init();
	};

	// https://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function (source, params) {
		if (arguments.length === 1) {
			return function () {
				const args = $.makeArray(arguments);
				args.unshift(source);
				return $.validator.format.apply(this, args);
			};
		}
		if (params === undefined) {
			return source;
		}
		if (arguments.length > 2 && params.constructor !== Array) {
			params = $.makeArray(arguments).slice(1);
		}
		if (params.constructor !== Array) {
			params = [params];
		}
		$.each(params, (i, n) => {
			source = source.replace(new RegExp(`\\{${i}\\}`, 'g'), () => n);
		});
		return source;
	};

	$.extend($.validator, {

		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: 'error',
			pendingClass: 'pending',
			validClass: 'valid',
			errorElement: 'span',
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $([]),
			errorLabelContainer: $([]),
			onsubmit: true,
			ignore: ':hidden',
			ignoreTitle: false,
			onfocusin(element) {
				this.lastActive = element;

				// Hide error label and remove error class on focus if enabled
				if (this.settings.focusCleanup) {
					if (this.settings.unhighlight) {
						this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
					}
					this.hideThese(this.errorsFor(element));
				}
			},
			onfocusout(element) {
				if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
					this.element(element);
				}
			},
			onkeyup(element, event) {
				// Avoid revalidate the field when pressing one of the following keys
				// Shift       => 16
				// Ctrl        => 17
				// Alt         => 18
				// Caps lock   => 20
				// End         => 35
				// Home        => 36
				// Left arrow  => 37
				// Up arrow    => 38
				// Right arrow => 39
				// Down arrow  => 40
				// Insert      => 45
				// Num lock    => 144
				// AltGr key   => 225
				const excludedKeys = [
					16, 17, 18, 20, 35, 36, 37,
					38, 39, 40, 45, 144, 225,
				];

				if (event.which === 9 && this.elementValue(element) === '' || $.inArray(event.keyCode, excludedKeys) !== -1) {

				} else if (element.name in this.submitted || element.name in this.invalid) {
					this.element(element);
				}
			},
			onclick(element) {
				// Click on selects, radiobuttons and checkboxes
				if (element.name in this.submitted) {
					this.element(element);

					// Or option elements, check parent select in that case
				} else if (element.parentNode.name in this.submitted) {
					this.element(element.parentNode);
				}
			},
			highlight(element, errorClass, validClass) {
				if (element.type === 'radio') {
					this.findByName(element.name).addClass(errorClass).removeClass(validClass);
				} else {
					$(element).addClass(errorClass).removeClass(validClass);
				}
			},
			unhighlight(element, errorClass, validClass) {
				if (element.type === 'radio') {
					this.findByName(element.name).removeClass(errorClass).addClass(validClass);
				} else {
					$(element).removeClass(errorClass).addClass(validClass);
				}
			},
		},

		// https://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults(settings) {
			$.extend($.validator.defaults, settings);
		},

		messages: {
			required: 'This field is required.',
			remote: 'Please fix this field.',
			email: 'Please enter a valid email address.',
			url: 'Please enter a valid URL.',
			date: 'Please enter a valid date.',
			dateISO: 'Please enter a valid date (ISO).',
			number: 'Please enter a valid number.',
			digits: 'Please enter only digits.',
			equalTo: 'Please enter the same value again.',
			maxlength: $.validator.format('Please enter no more than {0} characters.'),
			minlength: $.validator.format('Please enter at least {0} characters.'),
			rangelength: $.validator.format('Please enter a value between {0} and {1} characters long.'),
			range: $.validator.format('Please enter a value between {0} and {1}.'),
			max: $.validator.format('Please enter a value less than or equal to {0}.'),
			min: $.validator.format('Please enter a value greater than or equal to {0}.'),
			step: $.validator.format('Please enter a multiple of {0}.'),
		},

		autoCreateRanges: false,

		prototype: {

			init() {
				this.labelContainer = $(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
				this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();

				const { currentForm } = this;
				const groups = (this.groups = {});
				let rules;
				$.each(this.settings.groups, (key, value) => {
					if (typeof value === 'string') {
						value = value.split(/\s/);
					}
					$.each(value, (index, name) => {
						groups[name] = key;
					});
				});
				rules = this.settings.rules;
				$.each(rules, (key, value) => {
					rules[key] = $.validator.normalizeRule(value);
				});

				function delegate(event) {
					const isContentEditable = typeof $(this).attr('contenteditable') !== 'undefined' && $(this).attr('contenteditable') !== 'false';

					// Set form expando on contenteditable
					if (!this.form && isContentEditable) {
						this.form = $(this).closest('form')[0];
						this.name = $(this).attr('name');
					}

					// Ignore the element if it belongs to another form. This will happen mainly
					// when setting the `form` attribute of an input to the id of another form.
					if (currentForm !== this.form) {
						return;
					}

					const validator = $.data(this.form, 'validator');
					const eventType = `on${event.type.replace(/^validate/, '')}`;
					const { settings } = validator;
					if (settings[eventType] && !$(this).is(settings.ignore)) {
						settings[eventType].call(validator, this, event);
					}
				}

				$(this.currentForm)
					.on(
						'focusin.validate focusout.validate keyup.validate',
						":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], "
            + "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], "
            + "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], "
            + "[type='radio'], [type='checkbox'], [contenteditable], [type='button']",
						delegate,
					)

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
					.on('click.validate', "select, option, [type='radio'], [type='checkbox']", delegate);

				if (this.settings.invalidHandler) {
					$(this.currentForm).on('invalid-form.validate', this.settings.invalidHandler);
				}
			},

			// https://jqueryvalidation.org/Validator.form/
			form() {
				this.checkForm();
				$.extend(this.submitted, this.errorMap);
				this.invalid = $.extend({}, this.errorMap);
				if (!this.valid()) {
					$(this.currentForm).triggerHandler('invalid-form', [this]);
				}
				this.showErrors();
				return this.valid();
			},

			checkForm() {
				this.prepareForm();
				for (let i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
					this.check(elements[i]);
				}
				return this.valid();
			},

			// https://jqueryvalidation.org/Validator.element/
			element(element) {
				let cleanElement = this.clean(element);
				const checkElement = this.validationTargetFor(cleanElement);
				const v = this;
				let result = true;
				let rs; let
					group;

				if (checkElement === undefined) {
					delete this.invalid[cleanElement.name];
				} else {
					this.prepareElement(checkElement);
					this.currentElements = $(checkElement);

					// If this element is grouped, then validate all group elements already
					// containing a value
					group = this.groups[checkElement.name];
					if (group) {
						$.each(this.groups, (name, testgroup) => {
							if (testgroup === group && name !== checkElement.name) {
								cleanElement = v.validationTargetFor(v.clean(v.findByName(name)));
								if (cleanElement && cleanElement.name in v.invalid) {
									v.currentElements.push(cleanElement);
									result = v.check(cleanElement) && result;
								}
							}
						});
					}

					rs = this.check(checkElement) !== false;
					result = result && rs;
					if (rs) {
						this.invalid[checkElement.name] = false;
					} else {
						this.invalid[checkElement.name] = true;
					}

					if (!this.numberOfInvalids()) {
						// Hide error containers on last error
						this.toHide = this.toHide.add(this.containers);
					}
					this.showErrors();

					// Add aria-invalid status for screen readers
					$(element).attr('aria-invalid', !rs);
				}

				return result;
			},

			// https://jqueryvalidation.org/Validator.showErrors/
			showErrors(errors) {
				if (errors) {
					const validator = this;

					// Add items to error list and map
					$.extend(this.errorMap, errors);
					this.errorList = $.map(this.errorMap, (message, name) => ({
						message,
						element: validator.findByName(name)[0],
					}));

					// Remove items from success list
					this.successList = $.grep(this.successList, (element) => !(element.name in errors));
				}
				if (this.settings.showErrors) {
					this.settings.showErrors.call(this, this.errorMap, this.errorList);
				} else {
					this.defaultShowErrors();
				}
			},

			// https://jqueryvalidation.org/Validator.resetForm/
			resetForm() {
				if ($.fn.resetForm) {
					$(this.currentForm).resetForm();
				}
				this.invalid = {};
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();
				const elements = this.elements()
					.removeData('previousValue')
					.removeAttr('aria-invalid');

				this.resetElements(elements);
			},

			resetElements(elements) {
				let i;

				if (this.settings.unhighlight) {
					for (i = 0; elements[i]; i++) {
						this.settings.unhighlight.call(
							this,
							elements[i],
							this.settings.errorClass,
							'',
						);
						this.findByName(elements[i].name).removeClass(this.settings.validClass);
					}
				} else {
					elements
						.removeClass(this.settings.errorClass)
						.removeClass(this.settings.validClass);
				}
			},

			numberOfInvalids() {
				return this.objectLength(this.invalid);
			},

			objectLength(obj) {
				/* jshint unused: false */
				let count = 0;
				let i;
				for (i in obj) {
					// This check allows counting elements with empty error
					// message as invalid elements
					if (obj[i] !== undefined && obj[i] !== null && obj[i] !== false) {
						count++;
					}
				}
				return count;
			},

			hideErrors() {
				this.hideThese(this.toHide);
			},

			hideThese(errors) {
				errors.not(this.containers).text('');
				this.addWrapper(errors).hide();
			},

			valid() {
				return this.size() === 0;
			},

			size() {
				return this.errorList.length;
			},

			focusInvalid() {
				if (this.settings.focusInvalid) {
					try {
						$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
							.filter(':visible')
							.trigger('focus')

						// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
							.trigger('focusin');
					} catch (e) {

						// Ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive() {
				const { lastActive } = this;
				return lastActive && $.grep(this.errorList, (n) => n.element.name === lastActive.name).length === 1 && lastActive;
			},

			elements() {
				const validator = this;
				const rulesCache = {};

				// Select all valid inputs inside the form (no submit or reset buttons)
				return $(this.currentForm)
					.find('input, select, textarea, [contenteditable]')
					.not(':submit, :reset, :image, :disabled')
					.not(this.settings.ignore)
					.filter(function () {
						const name = this.name || $(this).attr('name'); // For contenteditable
						const isContentEditable = typeof $(this).attr('contenteditable') !== 'undefined' && $(this).attr('contenteditable') !== 'false';

						if (!name && validator.settings.debug && window.console) {
							console.error('%o has no name assigned', this);
						}

						// Set form expando on contenteditable
						if (isContentEditable) {
							this.form = $(this).closest('form')[0];
							this.name = name;
						}

						// Ignore elements that belong to other/nested forms
						if (this.form !== validator.currentForm) {
							return false;
						}

						// Select only the first element for each name, and only those with rules specified
						if (name in rulesCache || !validator.objectLength($(this).rules())) {
							return false;
						}

						rulesCache[name] = true;
						return true;
					});
			},

			clean(selector) {
				return $(selector)[0];
			},

			errors() {
				const errorClass = this.settings.errorClass.split(' ').join('.');
				return $(`${this.settings.errorElement}.${errorClass}`, this.errorContext);
			},

			resetInternals() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $([]);
				this.toHide = $([]);
			},

			reset() {
				this.resetInternals();
				this.currentElements = $([]);
			},

			prepareForm() {
				this.reset();
				this.toHide = this.errors().add(this.containers);
			},

			prepareElement(element) {
				this.reset();
				this.toHide = this.errorsFor(element);
			},

			elementValue(element) {
				const $element = $(element);
				const { type } = element;
				const isContentEditable = typeof $element.attr('contenteditable') !== 'undefined' && $element.attr('contenteditable') !== 'false';
				let val; let
					idx;

				if (type === 'radio' || type === 'checkbox') {
					return this.findByName(element.name).filter(':checked').val();
				} if (type === 'number' && typeof element.validity !== 'undefined') {
					return element.validity.badInput ? 'NaN' : $element.val();
				}

				if (isContentEditable) {
					val = $element.text();
				} else {
					val = $element.val();
				}

				if (type === 'file') {
					// Modern browser (chrome & safari)
					if (val.substr(0, 12) === 'C:\\fakepath\\') {
						return val.substr(12);
					}

					// Legacy browsers
					// Unix-based path
					idx = val.lastIndexOf('/');
					if (idx >= 0) {
						return val.substr(idx + 1);
					}

					// Windows-based path
					idx = val.lastIndexOf('\\');
					if (idx >= 0) {
						return val.substr(idx + 1);
					}

					// Just the file name
					return val;
				}

				if (typeof val === 'string') {
					return val.replace(/\r/g, '');
				}
				return val;
			},

			check(element) {
				element = this.validationTargetFor(this.clean(element));

				const rules = $(element).rules();
				const rulesCount = $.map(rules, (n, i) => i).length;
				let dependencyMismatch = false;
				let val = this.elementValue(element);
				let result; let method; let rule; let
					normalizer;

				// Prioritize the local normalizer defined for this element over the global one
				// if the former exists, otherwise user the global one in case it exists.
				if (typeof rules.normalizer === 'function') {
					normalizer = rules.normalizer;
				} else if (typeof this.settings.normalizer === 'function') {
					normalizer = this.settings.normalizer;
				}

				// If normalizer is defined, then call it to retreive the changed value instead
				// of using the real one.
				// Note that `this` in the normalizer is `element`.
				if (normalizer) {
					val = normalizer.call(element, val);

					// Delete the normalizer from rules to avoid treating it as a pre-defined method.
					delete rules.normalizer;
				}

				for (method in rules) {
					rule = { method, parameters: rules[method] };
					try {
						result = $.validator.methods[method].call(this, val, element, rule.parameters);

						// If a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if (result === 'dependency-mismatch' && rulesCount === 1) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if (result === 'pending') {
							this.toHide = this.toHide.not(this.errorsFor(element));
							return;
						}

						if (!result) {
							this.formatAndAdd(element, rule);
							return false;
						}
					} catch (e) {
						if (this.settings.debug && window.console) {
							console.log(`Exception occurred when checking element ${element.id}, check the '${rule.method}' method.`, e);
						}
						if (e instanceof TypeError) {
							e.message += `.  Exception occurred when checking element ${element.id}, check the '${rule.method}' method.`;
						}

						throw e;
					}
				}
				if (dependencyMismatch) {
					return;
				}
				if (this.objectLength(rules)) {
					this.successList.push(element);
				}
				return true;
			},

			// Return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage(element, method) {
				return $(element).data(`msg${method.charAt(0).toUpperCase()
				}${method.substring(1).toLowerCase()}`) || $(element).data('msg');
			},

			// Return the custom message for the given element name and validation method
			customMessage(name, method) {
				const m = this.settings.messages[name];
				return m && (m.constructor === String ? m : m[method]);
			},

			// Return the first defined argument, allowing empty strings
			findDefined() {
				for (let i = 0; i < arguments.length; i++) {
					if (arguments[i] !== undefined) {
						return arguments[i];
					}
				}
				return undefined;
			},

			// The second parameter 'rule' used to be a string, and extended to an object literal
			// of the following form:
			// rule = {
			//     method: "method name",
			//     parameters: "the given method parameters"
			// }
			//
			// The old behavior still supported, kept to maintain backward compatibility with
			// old code, and will be removed in the next major release.
			defaultMessage(element, rule) {
				if (typeof rule === 'string') {
					rule = { method: rule };
				}

				let message = this.findDefined(
					this.customMessage(element.name, rule.method),
					this.customDataMessage(element, rule.method),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[rule.method],
					`<strong>Warning: No message defined for ${element.name}</strong>`,
				);
				const theregex = /\$?\{(\d+)\}/g;
				if (typeof message === 'function') {
					message = message.call(this, rule.parameters, element);
				} else if (theregex.test(message)) {
					message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
				}

				return message;
			},

			formatAndAdd(element, rule) {
				const message = this.defaultMessage(element, rule);

				this.errorList.push({
					message,
					element,
					method: rule.method,
				});

				this.errorMap[element.name] = message;
				this.submitted[element.name] = message;
			},

			addWrapper(toToggle) {
				if (this.settings.wrapper) {
					toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
				}
				return toToggle;
			},

			defaultShowErrors() {
				let i; let elements; let
					error;
				for (i = 0; this.errorList[i]; i++) {
					error = this.errorList[i];
					if (this.settings.highlight) {
						this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
					}
					this.showLabel(error.element, error.message);
				}
				if (this.errorList.length) {
					this.toShow = this.toShow.add(this.containers);
				}
				if (this.settings.success) {
					for (i = 0; this.successList[i]; i++) {
						this.showLabel(this.successList[i]);
					}
				}
				if (this.settings.unhighlight) {
					for (i = 0, elements = this.validElements(); elements[i]; i++) {
						this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
					}
				}
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show();
			},

			validElements() {
				return this.currentElements.not(this.invalidElements());
			},

			invalidElements() {
				return $(this.errorList).map(function () {
					return this.element;
				});
			},

			showLabel(element, message) {
				let place; let group; let errorID; let v;
				let error = this.errorsFor(element);
				const elementID = this.idOrName(element);
				let describedBy = $(element).attr('aria-describedby');

				if (error.length) {
					// Refresh error/success class
					error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

					// Replace message on existing label
					error.html(message);
				} else {
					// Create error element
					error = $(`<${this.settings.errorElement}>`)
						.attr('id', `${elementID}-error`)
						.addClass(this.settings.errorClass)
						.html(message || '');

					// Maintain reference to the element to be placed into the DOM
					place = error;
					if (this.settings.wrapper) {
						// Make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap(`<${this.settings.wrapper}/>`).parent();
					}
					if (this.labelContainer.length) {
						this.labelContainer.append(place);
					} else if (this.settings.errorPlacement) {
						this.settings.errorPlacement.call(this, place, $(element));
					} else {
						place.insertAfter(element);
					}

					// Link error back to the element
					if (error.is('label')) {
						// If the error is a label, then associate using 'for'
						error.attr('for', elementID);

						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby
					} else if (error.parents(`label[for='${this.escapeCssMeta(elementID)}']`).length === 0) {
						errorID = error.attr('id');

						// Respect existing non-error aria-describedby
						if (!describedBy) {
							describedBy = errorID;
						} else if (!describedBy.match(new RegExp(`\\b${this.escapeCssMeta(errorID)}\\b`))) {
							// Add to end of list if not already present
							describedBy += ` ${errorID}`;
						}
						$(element).attr('aria-describedby', describedBy);

						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[element.name];
						if (group) {
							v = this;
							$.each(v.groups, (name, testgroup) => {
								if (testgroup === group) {
									$(`[name='${v.escapeCssMeta(name)}']`, v.currentForm)
										.attr('aria-describedby', error.attr('id'));
								}
							});
						}
					}
				}
				if (!message && this.settings.success) {
					error.text('');
					if (typeof this.settings.success === 'string') {
						error.addClass(this.settings.success);
					} else {
						this.settings.success(error, element);
					}
				}
				this.toShow = this.toShow.add(error);
			},

			errorsFor(element) {
				const name = this.escapeCssMeta(this.idOrName(element));
				const describer = $(element).attr('aria-describedby');
				let selector = `label[for='${name}'], label[for='${name}'] *`;

				// 'aria-describedby' should directly reference the error element
				if (describer) {
					selector = `${selector}, #${this.escapeCssMeta(describer)
						.replace(/\s+/g, ', #')}`;
				}

				return this
					.errors()
					.filter(selector);
			},

			// See https://api.jquery.com/category/selectors/, for CSS
			// meta-characters that should be escaped in order to be used with JQuery
			// as a literal part of a name/id or any selector.
			escapeCssMeta(string) {
				if (string === undefined) {
					return '';
				}

				// eslint-disable-next-line no-useless-escape
				return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, '\\$1');
			},

			idOrName(element) {
				return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
			},

			validationTargetFor(element) {
				// If radio/checkbox, validate first element in group instead
				if (this.checkable(element)) {
					element = this.findByName(element.name);
				}

				// Always apply ignore filter
				return $(element).not(this.settings.ignore)[0];
			},

			checkable(element) {
				return (/radio|checkbox/i).test(element.type);
			},

			findByName(name) {
				return $(this.currentForm).find(`[name='${this.escapeCssMeta(name)}']`);
			},

			getLength(value, element) {
				switch (element.nodeName.toLowerCase()) {
				case 'select':
					return $('option:selected', element).length;
				case 'input':
					if (this.checkable(element)) {
						return this.findByName(element.name).filter(':checked').length;
					}
				}
				return value.length;
			},

			depend(param, element) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
			},

			dependTypes: {
				boolean(param) {
					return param;
				},
				string(param, element) {
					return !!$(param, element.form).length;
				},
				function(param, element) {
					return param(element);
				},
			},

			optional(element) {
				

				const val = this.elementValue(element);
				return !$.validator.methods.required.call(this, val, element) && 'dependency-mismatch';
			},

			startRequest(element) {
				if (!this.pending[element.name]) {
					this.pendingRequest++;
					$(element).addClass(this.settings.pendingClass);
					this.pending[element.name] = true;
				}
			},

			stopRequest(element, valid) {
				this.pendingRequest--;

				// Sometimes synchronization fails, make sure pendingRequest is never < 0
				if (this.pendingRequest < 0) {
					this.pendingRequest = 0;
				}
				delete this.pending[element.name];
				$(element).removeClass(this.settings.pendingClass);
				if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form() && this.pendingRequest === 0) {
					$(this.currentForm).trigger('submit');

					// Remove the hidden input that was used as a replacement for the
					// missing submit button. The hidden input is added by `handle()`
					// to ensure that the value of the used submit button is passed on
					// for scripted submits triggered by this method
					if (this.submitButton) {
						$(`input:hidden[name='${this.submitButton.name}']`, this.currentForm).remove();
					}

					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
					$(this.currentForm).triggerHandler('invalid-form', [this]);
					this.formSubmitted = false;
				}
			},

			previousValue(element, method) {
				method = typeof method === 'string' && method || 'remote';

				return $.data(element, 'previousValue') || $.data(element, 'previousValue', {
					old: null,
					valid: true,
					message: this.defaultMessage(element, { method }),
				});
			},

			// Cleans up all forms and elements, removes validator-specific events
			destroy() {
				this.resetForm();

				$(this.currentForm)
					.off('.validate')
					.removeData('validator')
					.find('.validate-equalTo-blur')
					.off('.validate-equalTo')
					.removeClass('validate-equalTo-blur')
					.find('.validate-lessThan-blur')
					.off('.validate-lessThan')
					.removeClass('validate-lessThan-blur')
					.find('.validate-lessThanEqual-blur')
					.off('.validate-lessThanEqual')
					.removeClass('validate-lessThanEqual-blur')
					.find('.validate-greaterThanEqual-blur')
					.off('.validate-greaterThanEqual')
					.removeClass('validate-greaterThanEqual-blur')
					.find('.validate-greaterThan-blur')
					.off('.validate-greaterThan')
					.removeClass('validate-greaterThan-blur');
			},

		},

		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true },
		},

		addClassRules(className, rules) {
			if (className.constructor === String) {
				this.classRuleSettings[className] = rules;
			} else {
				$.extend(this.classRuleSettings, className);
			}
		},

		classRules(element) {
			const rules = {};
			const classes = $(element).attr('class');

			if (classes) {
				$.each(classes.split(' '), function () {
					if (this in $.validator.classRuleSettings) {
						$.extend(rules, $.validator.classRuleSettings[this]);
					}
				});
			}
			return rules;
		},

		normalizeAttributeRule(rules, type, method, value) {
			// Convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if (/min|max|step/.test(method) && (type === null || /number|range|text/.test(type))) {
				value = Number(value);

				// Support Opera Mini, which returns NaN for undefined minlength
				if (isNaN(value)) {
					value = undefined;
				}
			}

			if (value || value === 0) {
				rules[method] = value;
			} else if (type === method && type !== 'range') {
				// Exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[type === 'date' ? 'dateISO' : method] = true;
			}
		},

		attributeRules(element) {
			const rules = {};
			const $element = $(element);
			const type = element.getAttribute('type');
			let method; let
				value;

			for (method in $.validator.methods) {
				// Support for <input required> in both html5 and older browsers
				if (method === 'required') {
					value = element.getAttribute(method);
					

					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if (value === '') {
						value = true;
					}

					// Force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr(method);
				}

				this.normalizeAttributeRule(rules, type, method, value);
			}

			// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
				delete rules.maxlength;
			}

			return rules;
		},

		dataRules(element) {
			const rules = {};
			const $element = $(element);
			const type = element.getAttribute('type');
			let method; let
				value;

			for (method in $.validator.methods) {
				value = $element.data(`rule${method.charAt(0).toUpperCase()}${method.substring(1).toLowerCase()}`);

				// Cast empty attributes like `data-rule-required` to `true`
				if (value === '') {
					value = true;
				}
				

				this.normalizeAttributeRule(rules, type, method, value);
			}
			return rules;
		},

		staticRules(element) {
			let rules = {};
			const validator = $.data(element.form, 'validator');

			if (validator.settings.rules) {
				rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
			}
			return rules;
		},

		normalizeRules(rules, element) {
			// Handle dependency check
			$.each(rules, (prop, val) => {
				// Ignore rule when param is explicitly false, eg. required:false
				if (val === false) {
					delete rules[prop];
					return;
				}
				

				if (val.param || val.depends) {
					let keepRule = true;
					switch (typeof val.depends) {
					case 'string':
						keepRule = !!$(val.depends, element.form).length;
						break;
					case 'function':
						keepRule = val.depends.call(element, element);
						break;
					}
					if (keepRule) {
						rules[prop] = val.param !== undefined ? val.param : true;
					} else {
						$.data(element.form, 'validator').resetElements($(element));
						delete rules[prop];
					}
				}
			});

			// Evaluate parameters
			$.each(rules, (rule, parameter) => {
				rules[rule] = typeof parameter === 'function' && rule !== 'normalizer' ? parameter(element) : parameter;
			});

			// Clean number parameters
			$.each(['minlength', 'maxlength'], function () {
				if (rules[this]) {
					rules[this] = Number(rules[this]);
				}
			});
			$.each(['rangelength', 'range'], function () {
				let parts;
				if (rules[this]) {
					if (Array.isArray(rules[this])) {
						rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
					} else if (typeof rules[this] === 'string') {
						parts = rules[this].replace(/[\[\]]/g, '').split(/[\s,]+/);
						rules[this] = [Number(parts[0]), Number(parts[1])];
					}
				}
			});

			if ($.validator.autoCreateRanges) {
				// Auto-create ranges
				if (rules.min != null && rules.max != null) {
					rules.range = [rules.min, rules.max];
					delete rules.min;
					delete rules.max;
				}
				if (rules.minlength != null && rules.maxlength != null) {
					rules.rangelength = [rules.minlength, rules.maxlength];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			return rules;
		},

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule(data) {
			if (typeof data === 'string') {
				const transformed = {};
				$.each(data.split(/\s/), function () {
					transformed[this] = true;
				});
				data = transformed;
			}
			return data;
		},

		// https://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod(name, method, message) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
			if (method.length < 3) {
				$.validator.addClassRules(name, $.validator.normalizeRule(name));
			}
		},

		// https://jqueryvalidation.org/jQuery.validator.methods/
		methods: {

			// https://jqueryvalidation.org/required-method/
			required(value, element, param) {
				

				// Check if dependency is met
				if (!this.depend(param, element)) {
					return 'dependency-mismatch';
				}
				if (element.nodeName.toLowerCase() === 'select') {
					// Could be an array for select-multiple or a string, both are fine this way
					const val = $(element).val();
					return val && val.length > 0;
				}
				if (this.checkable(element)) {
					return this.getLength(value, element) > 0;
				}
				return value !== undefined && value !== null && value.length > 0;
			},

			// https://jqueryvalidation.org/email-method/
			email(value, element) {
				// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
			},

			// https://jqueryvalidation.org/url-method/
			url(value, element) {
				// Copyright (c) 2010-2013 Diego Perini, MIT licensed
				// https://gist.github.com/dperini/729294
				// see also https://mathiasbynens.be/demo/url-regex
				// modified to allow protocol-relative URLs
				return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
			},

			// https://jqueryvalidation.org/date-method/
			date: (function () {
				let called = false;

				return function (value, element) {
					if (!called) {
						called = true;
						if (this.settings.debug && window.console) {
							console.warn(
								"The `date` method is deprecated and will be removed in version '2.0.0'.\n"
                + "Please don't use it, since it relies on the Date constructor, which\n"
                + 'behaves very differently across browsers and locales. Use `dateISO`\n'
                + 'instead or one of the locale specific methods in `localizations/`\n'
                + 'and `additional-methods.js`.',
							);
						}
					}

					return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
				};
			}()),

			// https://jqueryvalidation.org/dateISO-method/
			dateISO(value, element) {
				return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
			},

			// https://jqueryvalidation.org/number-method/
			number(value, element) {
				return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
			},

			// https://jqueryvalidation.org/digits-method/
			digits(value, element) {
				return this.optional(element) || /^\d+$/.test(value);
			},

			// https://jqueryvalidation.org/minlength-method/
			minlength(value, element, param) {
				const length = Array.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || length >= param;
			},

			// https://jqueryvalidation.org/maxlength-method/
			maxlength(value, element, param) {
				const length = Array.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || length <= param;
			},

			// https://jqueryvalidation.org/rangelength-method/
			rangelength(value, element, param) {
				const length = Array.isArray(value) ? value.length : this.getLength(value, element);
				return this.optional(element) || (length >= param[0] && length <= param[1]);
			},

			// https://jqueryvalidation.org/min-method/
			min(value, element, param) {
				return this.optional(element) || value >= param;
			},

			// https://jqueryvalidation.org/max-method/
			max(value, element, param) {
				return this.optional(element) || value <= param;
			},

			// https://jqueryvalidation.org/range-method/
			range(value, element, param) {
				return this.optional(element) || (value >= param[0] && value <= param[1]);
			},

			// https://jqueryvalidation.org/step-method/
			step(value, element, param) {
				const type = $(element).attr('type');
				const errorMessage = `Step attribute on input type ${type} is not supported.`;
				const supportedTypes = ['text', 'number', 'range'];
				const re = new RegExp(`\\b${type}\\b`);
				const notSupported = type && !re.test(supportedTypes.join());
				const decimalPlaces = function (num) {
					const match = (`${num}`).match(/(?:\.(\d+))?$/);
					if (!match) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[1] ? match[1].length : 0;
				};
				const toInt = function (num) {
					return Math.round(num * 10 ** decimals);
				};
				let valid = true;
				let decimals;

				// Works only for text, number and range input types
				// TODO find a way to support input types date, datetime, datetime-local, month, time and week
				if (notSupported) {
					throw new Error(errorMessage);
				}

				decimals = decimalPlaces(param);

				// Value can't have too many decimals
				if (decimalPlaces(value) > decimals || toInt(value) % toInt(param) !== 0) {
					valid = false;
				}

				return this.optional(element) || valid;
			},

			// https://jqueryvalidation.org/equalTo-method/
			equalTo(value, element, param) {
				// Bind to the blur event of the target in order to revalidate whenever the target field is updated
				const target = $(param);
				if (this.settings.onfocusout && target.not('.validate-equalTo-blur').length) {
					target.addClass('validate-equalTo-blur').on('blur.validate-equalTo', () => {
						$(element).valid();
					});
				}
				return value === target.val();
			},

			// https://jqueryvalidation.org/remote-method/
			remote(value, element, param, method) {
				if (this.optional(element)) {
					return 'dependency-mismatch';
				}

				method = typeof method === 'string' && method || 'remote';

				const previous = this.previousValue(element, method);
				let validator; let data; let
					optionDataString;

				if (!this.settings.messages[element.name]) {
					this.settings.messages[element.name] = {};
				}
				previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
				this.settings.messages[element.name][method] = previous.message;

				param = typeof param === 'string' && { url: param } || param;
				optionDataString = $.param($.extend({ data: value }, param.data));
				if (previous.old === optionDataString) {
					return previous.valid;
				}

				previous.old = optionDataString;
				validator = this;
				this.startRequest(element);
				data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					mode: 'abort',
					port: `validate${element.name}`,
					dataType: 'json',
					data,
					context: validator.currentForm,
					success(response) {
						const valid = response === true || response === 'true';
						let errors;
						let message;
						let submitted;

						validator.settings.messages[element.name][method] = previous.originalMessage;
						if (valid) {
							submitted = validator.formSubmitted;
							validator.resetInternals();
							validator.toHide = validator.errorsFor(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.invalid[element.name] = false;
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage(element, { method, parameters: value });
							errors[element.name] = previous.message = message;
							validator.invalid[element.name] = true;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					},
				}, param));
				return 'pending';
			},
		},

	});

	// Ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

	const pendingRequests = {};
	let ajax;

	// Use a prefilter if available (1.5+)
	if ($.ajaxPrefilter) {
		$.ajaxPrefilter((settings, _, xhr) => {
			const { port } = settings;
			if (settings.mode === 'abort') {
				if (pendingRequests[port]) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function (settings) {
			const { mode } = 'mode' in settings ? settings : $.ajaxSettings;
			const { port } = 'port' in settings ? settings : $.ajaxSettings;
			if (mode === 'abort') {
				if (pendingRequests[port]) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}
	return $;
}));



$('form').each(function () {
	// validate signup form on keyup and submit
	$(this).validate({
		errorElement: 'span',
		rules: {
			name: 'required',
			search: 'required',
			company: 'required',
			email: {
				required: true,
				email: true
			},
			phone: {
				phoneUS: true
			},
			message: 'required'
			checkbox: 'required'
		},
		messages: {
			name: 'Error: First and Last Name is required.',
			company: 'Error: Company Name is required.',
			email: {
				required: 'Error: Email Address is required.',
				email: 'Error: Enter a valid email format. (e.g. email@domain.com)'
			},
			search: {
				required: 'Error: Search field is required.',
			},
			phone: {
				phoneUS: 'Error: Enter a valid phone number (e.g. (XXX) XXX-XXXX)'
			},
			message: 'Error: Message is required.'
			checkbox: 'Error: You must agree to the processing of personal data'
		}
	})

});


$('form').each(function () {
	$(this).validate();
});


