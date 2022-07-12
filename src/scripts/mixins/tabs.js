function initTabs() {
	const tablist = document.querySelectorAll('[role="tablist"]')[0];
	let tabs;
	let panels;


	function generateArrays() {
		tabs = document.querySelectorAll('[role="tab"]');
		panels = document.querySelectorAll('[role="tabpanel"]');
	}

	generateArrays();
	// For easy reference
	const keys = {
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		delete: 46,
		enter: 13,
		space: 32,
	};

	// Add or subtract depending on key pressed
	const direction = {
		37: -1,
		38: -1,
		39: 1,
		40: 1,
	};


	// Deactivate all tabs and tab panels
	function deactivateTabs() {
		for (let t = 0; t < tabs.length; t += 1) {
			tabs[t].setAttribute('tabindex', '-1');
			tabs[t].setAttribute('aria-selected', 'false');
		}

		for (let p = 0; p < panels.length; p += 1) {
			panels[p].setAttribute('hidden', 'hidden');
		}
	}

	// Bind listeners
	// Activates any given tab panel
	function activateTab(tab, setFocus) {
		// eslint-disable-next-line no-param-reassign
		setFocus = setFocus || true;
		// Deactivate all other tabs
		deactivateTabs();

		// Remove tabindex attribute
		tab.removeAttribute('tabindex');

		// Set the tab as selected
		tab.setAttribute('aria-selected', 'true');

		// Get the value of aria-controls (which is an ID)
		const controls = tab.getAttribute('aria-controls');

		// Remove hidden attribute from tab panel to make it visible
		document.getElementById(controls).removeAttribute('hidden');

		// Set focus when required
		if (setFocus) {
			tab.focus();
		}
	}

	// When a tab is clicked, activateTab is fired to activate it
	function clickEventListener(event) {
		const tab = event.target;
		activateTab(tab, false);
	}
	// Make a guess
	function focusFirstTab() {
		tabs[0].focus();
	}

	// Make a guess
	function focusLastTab() {
		tabs[tabs.length - 1].focus();
	}
	// When a tablistâ€™s aria-orientation is set to vertical,
	// only up and down arrow should function.
	// In all other cases only left and right arrow function.
	function switchTabOnArrowPress(event) {
		const pressed = event.keyCode;

		if (direction[pressed]) {
			const { target } = event;
			if (target.index !== undefined) {
				if (tabs[target.index + direction[pressed]]) {
					tabs[target.index + direction[pressed]].focus();
				} else if (pressed === keys.left || pressed === keys.up) {
					focusLastTab();
				} else if (pressed === keys.right || pressed === keys.down) {
					focusFirstTab();
				}
			}
		}
	}
	function determineOrientation(event) {
		const key = event.keyCode;
		const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
		let proceed = false;

		if (vertical) {
			if (key === keys.up || key === keys.down) {
				event.preventDefault();
				proceed = true;
			}
		} else if (key === keys.left || key === keys.right) {
			proceed = true;
		}

		if (proceed) {
			switchTabOnArrowPress(event);
		}
	}
	// Handle keydown on tabs
	function keydownEventListener(event) {
		const key = event.keyCode;

		switch (key) {
		case keys.end:
			event.preventDefault();
			// Activate last tab
			focusLastTab();
			break;
		case keys.home:
			event.preventDefault();
			// Activate first tab
			focusFirstTab();
			break;

			// Up and down are in keydown
			// because we need to prevent page scroll >:)
		case keys.up:
		case keys.down:
			determineOrientation(event);
			break;
		default:
			break;
		}
	}


	// Deletes a tab and its panel
	function deleteTab(event) {
		const { target } = event;
		const panel = document.getElementById(target.getAttribute('aria-controls'));

		target.parentElement.removeChild(target);
		panel.parentElement.removeChild(panel);
	}
	// Detect if a tab is deletable
	function determineDeletable(event) {
		const { target } = event;

		if (target.getAttribute('data-deletable') !== null) {
			// Delete target tab
			deleteTab(event, target);

			// Update arrays related to tabs widget
			generateArrays();

			// Activate the closest tab to the one that was just deleted
			if (target.index - 1 < 0) {
				activateTab(tabs[0]);
			} else {
				activateTab(tabs[target.index - 1]);
			}
		}
	}
	// Handle keyup on tabs
	function keyupEventListener(event) {
		const key = event.keyCode;

		switch (key) {
		case keys.left:
		case keys.right:
			determineOrientation(event);
			break;
		case keys.delete:
			determineDeletable(event);
			break;
		case keys.enter:
		case keys.space:
			activateTab(event.target);
			break;
		default:
			break;
		}
	}
	// Either focus the next, previous, first, or last tab
	// depending on key pressed

	function addListeners(index) {
		tabs[index].addEventListener('click', clickEventListener);
		tabs[index].addEventListener('keydown', keydownEventListener);
		tabs[index].addEventListener('keyup', keyupEventListener);

		// Build an array with all tabs (<button>s) in it
		tabs[index].index = index;
	}
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < tabs.length; ++i) {
		addListeners(i);
	}

	// Determine whether there should be a delay
	// when user navigates with the arrow keys
/* function determineDelay() {
		const hasDelay = tablist.hasAttribute('data-delay');
		let delay = 0;

		if (hasDelay) {
			const delayValue = tablist.getAttribute('data-delay');
			if (delayValue) {
				delay = delayValue;
			} else {
				// If no value is specified, default to 300ms
				delay = 300;
			}
		}

		return delay;
	} */
}
initTabs();
