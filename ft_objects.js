function ft_createdxf() {
	return {
		header: {},
		classes: [],
		tables: [],
		blocks: [],
		entities: [],
		objects: [],
		thumbnailimage: []
	}
}

function ft_createline(x1, y1, x2, y2) {
	return {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	}
}

function ft_createcanvas(size_x, size_y) {
	if (!size_x)
		var size_x = 5000;
	if (!size_y)
		var size_y = 5000;
	var canvas = document.createElement("canvas");

	canvas.setAttribute("class", "c_canvas");
	canvas.setAttribute("width", size_x);
	canvas.setAttribute("height", size_y);
	return canvas;
}
