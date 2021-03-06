function ft_nextchar(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
}

function ft_toarray() {
	var pattern = /\r\n|\r|\n */g;
	var array = this.str.split(pattern);

	for (var i = 0; i < array.length; i++)
		array[i] = array[i].trim();
	this.array = array;
}

function ft_getduo() {
	var tmp = {}

	tmp[0] = this.array[this.index];
	tmp[1] = this.array[this.index + 1];
	this.index += 2;
	return tmp;
}

function ft_getsection() {
	this.current = this.ft_getduo();
	if (this.current[0] == '2' && this.current[1] == 'HEADER')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'CLASSES')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'TABLES')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'BLOCKS')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'ENTITIES')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'OBJECTS')
		this.section = this.current[1];
	else if (this.current[0] == '2' && this.current[1] == 'ACDSDATA')
		this.section = this.current[1];
	this.current = this.ft_getduo();
}

function ft_parse_header() {
	var tmp = this.current;

	this.current = this.ft_getduo();
	this.dt_header[tmp[1]] = this.current[1];
}

function ft_parse_class () {
	var index = this.dt_classes.length;

	this.dt_classes.push({});
	this.current = this.ft_getduo();
	while (this.current[0] != '0')
	{
		this.dt_classes[index][this.current[0]] = this.current[1];
		this.current = this.ft_getduo();
	}
}

function ft_parse_table() {
	var index = this.dt_tables.length;

	this.dt_tables.push({});
	this.current = this.ft_getduo();
	while (this.current[1] != 'ENDTAB')
	{
		var tmp;
		if (this.dt_tables[index]['name'] == undefined && this.current[0] == '2')
		{
			tmp = 'A';
			this.dt_tables[index]['name'] = this.current[1];
			while (this.current[0] != '0')
			{
				this.dt_tables[index][this.current[0]] = this.current[1];
				this.current = this.ft_getduo();
			}
		}
		else if (this.current[1] == this.dt_tables[index]['name'])
		{
			this.dt_tables[index][tmp] = {};
			this.current = this.ft_getduo();

			while (this.current[0] != '0')
			{
				this.dt_tables[index][tmp][this.current[0]] = this.current[1];
				this.current = this.ft_getduo();
			}
			tmp = this.ft_nextchar(tmp);
		}
	}
	this.current = this.ft_getduo();
}

function ft_parse_block() {
	var index = this.dt_blocks.length;

	this.dt_blocks.push({});
	this.current = this.ft_getduo();
	while (this.current[0] != '0')
	{
		this.dt_blocks[index][this.current[0]] = this.current[1];
		this.current = this.ft_getduo();
	}
}

function ft_parse_entity() {
	var index = this.dt_entities.length;

	this.dt_entities.push({});
	this.dt_entities[index][this.current[0]] = this.current[1];
	this.current = this.ft_getduo();
	while (this.current[0] != '0')
	{
		if (typeof this.dt_entities[index][this.current[0]] == 'undefined')
			this.dt_entities[index][this.current[0]] = this.current[1];
		else if (typeof this.dt_entities[index][this.current[0]] == 'string')
		{
			var tmp = this.dt_entities[index][this.current[0]];
			this.dt_entities[index][this.current[0]] = [];
			this.dt_entities[index][this.current[0]].push(tmp);
			this.dt_entities[index][this.current[0]].push(this.current[1]);
		}
		else if (typeof this.dt_entities[index][this.current[0]] == 'object')
			this.dt_entities[index][this.current[0]].push(this.current[1]);
		this.current = this.ft_getduo();
	}
}

function ft_upper(arg, val) {
	if (typeof arg == 'undefined' && typeof val != null)
		return (parseInt(val));
	if (parseInt(arg) > parseInt(val))
		return (parseInt(val));
	return (arg)
}

function ft_lower(arg, val) {
	if (typeof arg == 'undefined' && typeof val != null)
		return (parseInt(val));
	if (parseInt(arg) < parseInt(val))
		return (parseInt(val));
	return (arg)
}

function ft_seeksize(entity, index, array) {
	if (entity == null)
		return ;
	else if (entity[0] != 'LINE' && entity[0] != 'MTEXT' && entity[0] != 'TEXT')
		return ;

	arguments.callee.x_min = ft_upper(arguments.callee.x_min, entity[10])
	arguments.callee.x_max = ft_lower(arguments.callee.x_max, entity[10])
	arguments.callee.y_min = ft_upper(arguments.callee.y_min, entity[20])
	arguments.callee.y_max = ft_lower(arguments.callee.y_max, entity[20])

	if (entity[0] == 'LINE')
	{
		arguments.callee.x_min = ft_upper(arguments.callee.x_min, entity[11])
		arguments.callee.x_max = ft_lower(arguments.callee.x_max, entity[11])
		arguments.callee.y_min = ft_upper(arguments.callee.y_min, entity[21])
		arguments.callee.y_max = ft_lower(arguments.callee.y_max, entity[21])
	}
}

function ft_parse() {
	while (this.index < this.array.length - 2)
	{
		if (this.current[0] == '0' && this.current[1] == 'SECTION')
			this.ft_getsection();
		else if (this.current[0] == '0' && this.current[1] == 'ENDSEC')
			this.current = this.ft_getduo();
		else if (this.current[0] == '9' && this.section == 'HEADER')
			this.ft_parse_header();
		else if (this.current[0] == '0' && this.section == 'CLASSES')
			this.ft_parse_class();
		else if (this.current[0] == '0' && this.section == 'TABLES')
			this.ft_parse_table();
		else if (this.current[0] == '0' && this.section == 'BLOCKS')
			this.ft_parse_block();
		else if (this.current[0] == '0' && this.section == 'ENTITIES')
			this.ft_parse_entity();
		else
			this.current = this.ft_getduo();
	}

	this.dt_entities.forEach(this.ft_seeksize);

	this.width = this.ft_seeksize.x_max - this.ft_seeksize.x_min;
	this.height = this.ft_seeksize.y_max - this.ft_seeksize.y_min;
}

function ft_get_group(group_name) {
	if (!this.kt_groups[group_name])
		this.kt_groups[group_name] = new Kinetic.Group(
		{
			name: group_name,
		});
	return this.kt_groups[group_name]
}

function ft_shape_line(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[8])
		var group = this.ft_get_group(entity[8]);
	var len = this.kt_shapes.push( new Kinetic.Line({
		points: [
			parseInt(entity[10]) - x_min,
			parseInt(entity[20]) - y_min,
			parseInt(entity[11]) - x_min,
			parseInt(entity[21]) - y_min
		],
		stroke: 'black'
	}))
	group.add(this.kt_shapes[len - 1]);
}

function ft_shape_polyline(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[6] == 'HIDDEN')
		return ;
	if (entity[8])
		var group = this.ft_get_group(entity[8]);

	if (typeof entity[10] == 'object')
	{
		for (var i = 0; i < entity[10].length; i++)
		{
			var len = this.kt_shapes.push( new Kinetic.Line({
				points: [
					parseInt(entity[10][i]) - x_min,
					parseInt(entity[20][i]) - y_min,
					parseInt(entity[10][i + 1]) - x_min,
					parseInt(entity[20][i + 1]) - y_min
				],
				stroke: 'black'
			}))
			group.add(this.kt_shapes[len - 1]);
		};
	}
	else
		ft_shape_line(entity);
}

function ft_shape_arc(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[8])
		var group = this.ft_get_group(entity[8]);
	var len = this.kt_shapes.push( new Kinetic.Arc({
		x: parseInt(entity[10]) - x_min,
		y: parseInt(entity[20]) - y_min,
		innerRadius: entity[40],
		stroke: 'black',
		angle: parseInt(entity[51]) - parseInt(entity[50]),
		rotationDeg: parseInt(entity[50])
	}))
	group.add(this.kt_shapes[len - 1]);
}

function ft_shape_circle(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[8])
		var group = this.ft_get_group(entity[8]);
	var len = this.kt_shapes.push( new Kinetic.Circle({
		x: parseInt(entity[10]) - x_min,
		y: parseInt(entity[20]) - y_min,
		radius: parseInt(entity[40]),
		stroke: 'black'
	}))
	group.add(this.kt_shapes[len - 1]);
}

function ft_getdot(str) {
	var i = 0;
	var len = str.length

	while (str[i] && str[i] != ';')
	i += 1;
	if (i == len)
		return 0;
	else
		return i + 1;
}

function ft_regexion(str) {
	var tmp = str.match(/.?;(.+)\}?$/)
	if (tmp == null)
		return str
	else
		return ft_regexion(tmp[1])
}

function ft_shape_text(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[8])
		var group = this.ft_get_group(entity[8]);
	var len = this.kt_shapes.push( new Kinetic.Text({
		name: entity[5],
		x: parseInt(entity[10]) - x_min,
		y: parseInt(entity[20]) - y_min,
		fontSize: 10,
		fontFamily: 'Calibri',
		fill: 'black',
		text: entity[1]
	}));
	group.add(this.kt_shapes[len - 1]);
}

function ft_shape_mtext(entity) {
	var x_min = this.ft_seeksize.x_min;
	var y_min = this.ft_seeksize.y_min;

	if (entity[8])
		var group = this.ft_get_group(entity[8]);
	var len = this.kt_shapes.push( new Kinetic.Text({
		name: entity[5],
		x: parseInt(entity[10]) - x_min,
		y: parseInt(entity[20]) - y_min,
		fontSize: 10,
		fontFamily: 'Calibri',
		fill: 'green',
		text: ft_regexion(entity[1]).replace(/\}/, "").replace(/\\./g, " ").substr(0, 32),
	}));
	group.add(this.kt_shapes[len - 1]);
}

function ft_toJPEG() {
	// 0 = Unitless; 1 = Inches; 2 = Feet; 3 = Miles; 4 = Millimeters;
	// 5 = Centimeters; 6 = Meters; 7 = Kilometers; 8 = Microinches;
	// 9 = Mils; 10 = Yards; 11 = Angstroms; 12 = Nanometers;
	// 13 = Microns; 14 = Decimeters; 15 = Decameters;
	// 16 = Hectometers; 17 = Gigameters; 18 = Astronomical units;
	// 19 = Light years; 20 = Parsecs
	if (this.dt_header['$INSUNITS'] == 1) {
		MyRatio = 25.4
	}
	if (this.dt_header['$INSUNITS'] == 2) {
		MyRatio = 304.8
	}
	if (this.dt_header['$INSUNITS'] == 3) {
		MyRatio = 0.0000006214
	}
	if (this.dt_header['$INSUNITS'] == 4) {
		MyRatio = 1
	}
	if (this.dt_header['$INSUNITS'] == 5) {
		MyRatio = 10
	}
	if (this.dt_header['$INSUNITS'] == 6) {
		MyRatio = 1000
	}
	return this.kt_layer.toImage({
		mimeType : "image/png",
		x:0,
		y:0,
		width: this.width + 2,
		height: this.height + 2,
		callback: function(img) {
			print(this)
			MyImage = img
		}
	});
}

function ft_toKinetic(bool) {
	if (document.getElementById('container'))
	{
		if (bool == 'stage')
			this.kt_stage = new Kinetic.Stage({
				container: 'container',
				width: this.width + 2,
				height: this.height + 2
			});
		this.kt_layer = new Kinetic.Layer({});
		this.kt_groups = [];
		this.kt_shapes = [];
		for (var i = 0; i < this.dt_entities.length; i++) { // ENTITY SELECTION TO SHAPE
			// print(i + "  " + this.dt_entities[i][0])
			if (this.dt_entities[i][0] == 'LINE')
				this.ft_shape_line(this.dt_entities[i]);
			else if (this.dt_entities[i][0] == 'LWPOLYLINE')
				this.ft_shape_polyline(this.dt_entities[i]);
			else if (this.dt_entities[i][0] == 'MTEXT')
				this.ft_shape_mtext(this.dt_entities[i]);
			else if (this.dt_entities[i][0] == 'TEXT')
				this.ft_shape_text(this.dt_entities[i]);
			else if (this.dt_entities[i][0] == 'CIRCLE')
				this.ft_shape_circle(this.dt_entities[i]);
			else if (this.dt_entities[i][0] == 'ARC')
				this.ft_shape_arc(this.dt_entities[i]);
// 			else if (this.dt_entities[i][0] == 'DIMENSION')
// 				print(this.dt_entities[i])
// 			else
// 				print(this.dt_entities[i][0])
// 				print(this.dt_entities[i])
// 			else if (this.dt_entities[i][0] == 'LWPOLYLINE')
//			 	print(i + "  " + this.dt_entities[i][6])
		};
		for (i in this.kt_groups) {
			this.kt_layer.add(this.kt_groups[i]);
		};
		if (bool == 'stage')
			this.kt_stage.add(this.kt_layer)

		this.ft_toJPEG()
	}
	else
		log('provide container plz')
}

function DXF(BinaryString, bool) {
	this.str = BinaryString;

	// DATA
	this.dt_header = {};
	this.dt_classes = [];
	this.dt_tables = [];
	this.dt_blocks = [];
	this.dt_entities = [];
	this.dt_objects = [];
	this.dt_thumbnailimage = [];

	// FUNCTION
	this.ft_nextchar = ft_nextchar;
	this.ft_toarray = ft_toarray;
	this.ft_getduo = ft_getduo;
	this.ft_getsection = ft_getsection;

	this.ft_parse_header = ft_parse_header;
	this.ft_parse_class = ft_parse_class;
	this.ft_parse_table = ft_parse_table;
	this.ft_parse_block = ft_parse_block;
	this.ft_parse_entity = ft_parse_entity

	this.ft_seeksize = ft_seeksize;
	this.ft_parse = ft_parse;
	this.ft_get_group = ft_get_group;
	this.ft_shape_line = ft_shape_line;
	this.ft_shape_polyline = ft_shape_polyline;
	this.ft_shape_arc = ft_shape_arc;
	this.ft_shape_circle = ft_shape_circle;
	this.ft_shape_text = ft_shape_text;
	this.ft_shape_mtext = ft_shape_mtext;

	// USER CALL
	this.ft_toKinetic = ft_toKinetic;
	this.ft_toJPEG = ft_toJPEG;

	// CONSTRUCTOR
	this.ft_toarray();
	this.index = 0;
	this.ft_seeksize.x_min = undefined
	this.ft_seeksize.x_max = undefined
	this.ft_seeksize.y_min = undefined
	this.ft_seeksize.y_max = undefined
	this.current = this.ft_getduo();
	this.ft_parse();
	this.ft_toKinetic(bool);

	log(this);
}
