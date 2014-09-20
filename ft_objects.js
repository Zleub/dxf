function ft_createdxf() {
	return {
		header: [],
		classes: [],
		tables: [],
		blocks: [],
		entities: [],
		objects: [],
		thumbnailimage: []
	}
}

function ft_createformat(key, value) {
	return {
		key: key,
		value: value
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
