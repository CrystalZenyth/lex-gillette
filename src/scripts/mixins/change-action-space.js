
function playEvent(e) {
	if (e.key === 'Space' || e.keyCode === 32) {
		if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
			e.target.click();
			e.preventDefault();
		}
	}
}
window.addEventListener('keydown', playEvent);
