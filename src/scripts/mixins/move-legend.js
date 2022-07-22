

function moveLegend() {
	const legends = document.querySelectorAll('legend');
	legends.forEach((legend) => {
		const embedParent = legend.closest('.w-embed');
		embedParent.before(legend);
		embedParent.remove();
	});
}

moveLegend();
