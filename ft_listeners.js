function ft_listener() {
	var file = document.getElementById("files").files[0];
	var reader = new FileReader();

	reader.onloadend = ft_onreadend;
	reader.readAsBinaryString(file);
}

function ft_epur() {
	var tmp = numberElem.textContent;
	tmp = tmp.replace(" ", "");
	tmp = tmp.replace("\t", "");
	tmp = tmp.replace("\n", "");
	tmp = tmp.replace("\r", "");
	numberElem.textContent = tmp;
}

function ft_block() {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("class", "c_canvas");
	canvas.setAttribute("width", "1600");
	canvas.setAttribute("height", "1200");

	if (blockElem.childElementCount == 0)
		blockElem.appendChild(canvas);
	else {
		blockElem.removeChild(blockElem.firstChild);
		blockElem.appendChild(canvas);
	}
	var nbr = parseInt(numberElem.textContent);
	if (typeof object != "undefined")
		ft_draw_block(canvas, object.blocks[nbr]);
	else
		log("no dxf");
}
