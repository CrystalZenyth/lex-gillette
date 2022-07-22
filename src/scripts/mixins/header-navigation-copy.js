/* eslint-disable no-tabs */
/* eslint-disable max-len */
// focusin/out event polyfill (firefox)

!(function () {
	const w = window;
	const d = w.document;

	if (w.onfocusin === undefined) {
		d.addEventListener('focus', addPolyfill, true);
		d.addEventListener('blur', addPolyfill, true);
		d.addEventListener('focusin', removePolyfill, true);
		d.addEventListener('focusout', removePolyfill, true);
	}
	function addPolyfill(e) {
		const type = e.type === 'focus' ? 'focusin' : 'focusout';
		const event = new CustomEvent(type, { bubbles: true, cancelable: false });
		event.c1Generated = true;
		e.target.dispatchEvent(event);
	}
	function removePolyfill(e) {
		if (!e.c1Generated) { // focus after focusin, so chrome will the first time trigger tow times focusin
			d.removeEventListener('focus', addPolyfill, true);
			d.removeEventListener('blur', addPolyfill, true);
			d.removeEventListener('focusin', removePolyfill, true);
			d.removeEventListener('focusout', removePolyfill, true);
		}
		setTimeout(() => {
			d.removeEventListener('focusin', removePolyfill, true);
			d.removeEventListener('focusout', removePolyfill, true);
		});
	}
}());

function hasClass(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	}
	return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

const menuItems1 = document.querySelectorAll('.flyoutnavigation li.has-submenu');
let timer1; let
	timer2;

const parseHTML = function (str) {
	const tmp = document.implementation.createHTMLDocument();
	tmp.body.innerHTML = str;
	return tmp.body.children;
};

Array.prototype.forEach.call(menuItems1, (el, i) => {
	const activatingA = el.querySelector('a');
	const btn = `<button><span><span class="visuallyhidden">show submenu for “${activatingA.text}”</span></span></button>`;
	activatingA.insertAdjacentHTML('afterend', btn);
	el.addEventListener('mouseover', function (event) {

    const buttons = document.querySelectorAll('.flyoutnavigation .has-submenu.open button');
    buttons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });
    const itemsHasSubmenu = document.querySelectorAll('.flyoutnavigation .has-submenu.open');
    itemsHasSubmenu.forEach((item) => {
      item.className = 'has-submenu';
    })
		this.className = 'has-submenu open';
		/* this.querySelector('a').setAttribute('aria-expanded', 'true'); */
		this.querySelector('button').setAttribute('aria-expanded', 'true');
		clearTimeout(timer1);
	});
	el.addEventListener('mouseout', (event) => {
		timer1 = setTimeout((event) => {
			/* document.querySelector('.flyoutnavigation .has-submenu.open a').setAttribute('aria-expanded', 'false'); */
      const buttons = document.querySelectorAll('.flyoutnavigation .has-submenu.open button');
      buttons.forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });
      const itemsHasSubmenu = document.querySelectorAll('.flyoutnavigation .has-submenu.open');
      itemsHasSubmenu.forEach((item) => {
        item.className = 'has-submenu';
      })
      
      

/*       document.querySelector('.flyoutnavigation .has-submenu.open button').setAttribute('aria-expanded', 'false');
			document.querySelector('.flyoutnavigation .has-submenu.open').className = 'has-submenu'; */
		}, 100);
	});
	el.querySelector('button').addEventListener('click', function (event) {
		if (this.parentNode.className == 'has-submenu') {
			this.parentNode.className = 'has-submenu open';
			/* this.parentNode.querySelector('a').setAttribute('aria-expanded', 'true'); */
			this.parentNode.querySelector('button').setAttribute('aria-expanded', 'true');
		} else {
			this.parentNode.className = 'has-submenu';
			/* this.parentNode.querySelector('a').setAttribute('aria-expanded', 'false'); */
			this.parentNode.querySelector('button').setAttribute('aria-expanded', 'false');
		}
		event.preventDefault();
	});
	const links = el.querySelectorAll('a');
	Array.prototype.forEach.call(links, (el, i) => {
		el.addEventListener('focus', () => {
			if (timer2) {
				clearTimeout(timer2);
				timer2 = null;
			}
		});
		el.addEventListener('blur', (event) => {
			timer2 = setTimeout(() => {
				const opennav = document.querySelector('.flyoutnavigation .has-submenu.open');
				if (opennav) {
					opennav.className = 'has-submenu';
					/* opennav.querySelector('a').setAttribute('aria-expanded', 'false'); */
					opennav.querySelector('button').setAttribute('aria-expanded', 'false');
				}
			}, 10);
		});
	});
});

