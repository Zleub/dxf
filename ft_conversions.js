function ft_toarray(read) {
	var pattern = /\r\n|\r|\n */g;
	var array = read.split(pattern);
	for (var i = 1; i < array.length; i++)
		array[i] = array[i].trim();
	return array;
}

// function ft_toblock()

function ft_toobject(dxf_array) {
	var i = 0;
	var i2 = 0;
	var dxf_object = ft_createdxf();

	while (i < dxf_array.length) {
		if (dxf_array[i] == '2' && dxf_array[i + 1] == 'HEADER') {
			i += 3;
			while (dxf_array[i] != 'ENDSEC') {
				if (dxf_array[i][0] == '$') {
					dxf_object.header[dxf_array[i]] = [];
					var index = dxf_array[i];
				}
				else
					dxf_object.header[index].push(dxf_array[i]);
				i += 2;
			}
			i += 1;
		}
		else if (dxf_array[i] == '0' && dxf_array[i + 1] == 'BLOCK') {
			tmp = dxf_object.blocks.length;
			dxf_object.blocks.push([]);
			while (dxf_array[i - 1] != 'ENDBLK') {
				dxf_object.blocks[tmp].push({ key: dxf_array[i], value: dxf_array[i + 1] });
				i += 2;
			}
		}
		i += 2;
	}
	return dxf_object;
}
