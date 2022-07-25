

function moveLegend() {
	const legends = document.querySelectorAll('legend');
	legends.forEach((legend) => {
		const parent = legend.parentNode;
		parent.before(legend);
		parent.remove();
	});
}

moveLegend();
