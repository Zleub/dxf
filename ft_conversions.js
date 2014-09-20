function ft_toarray(read) {
	var pattern = /\r\n|\r|\n */g;
	var array = read.split(pattern);
	for (var i = 1; i < array.length; i++)
		array[i] = array[i].trim();
	return array;
}

function ft_toobject(dxf_array) {
	var i = 0;
	var i2 = 0;
	var dxf_object = ft_createdxf();

	while (i < dxf_array.length) {
		if (dxf_array[i] == "0" && dxf_array[i + 1] == "BLOCK") {
			tmp = dxf_object.blocks.length;
			dxf_object.blocks.push([]);
			while (dxf_array[i - 1] != "ENDBLK") {
				dxf_object.blocks[tmp].push(ft_createformat(dxf_array[i], dxf_array[i + 1]));
				i += 2;
			}
		}
		i += 2;
	}
	return dxf_object;
}
