function ft_nextchar(c) {
		return String.fromCharCode(c.charCodeAt(0) + 1);
	}

function ft_toarray() {
		var pattern = /\r\n|\r|\n */g;
		var array = this.str.split(pattern);

		for (var i = 0; i < array.length; i++)
			array[i] = array[i].trim();
		this.array = array;
	};

function ft_getduo() {
		var tmp = {}

		tmp[0] = this.array[this.index];
		tmp[1] = this.array[this.index + 1];
		this.index += 2;
		return tmp;
	};

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
		log(this.section);
	};

function ft_parse_header() {
		var tmp = this.current;

		this.current = this.ft_getduo();
		this.dt_header[tmp[1]] = this.current[1];
	};

function ft_parse_class () {
		var index = this.dt_classes.length;

		this.dt_classes.push({});
		// log('push CLASS');
		this.current = this.ft_getduo();
		while (this.current[0] != '0')
		{
			// log(this.current)
			this.dt_classes[index][this.current[0]] = this.current[1];
			this.current = this.ft_getduo();
		}
	};

function ft_parse_table() {
		var index = this.dt_tables.length;

		this.dt_tables.push({});
		log('push TABLE');
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
		// log('push BLOCK');
		this.current = this.ft_getduo();
		while (this.current[0] != '0')
		{
			// log(this.current)
			this.dt_blocks[index][this.current[0]] = this.current[1];
			this.current = this.ft_getduo();
		}
	}

function ft_parse_entity() {
		var index = this.dt_entities.length;

		this.dt_entities.push({});
		// log('push ENTITIES');
		this.dt_entities[index][this.current[0]] = this.current[1];
		this.current = this.ft_getduo();
		while (this.current[0] != '0')
		{
			// log(this.current)
			this.dt_entities[index][this.current[0]] = this.current[1];
			this.current = this.ft_getduo();
		}
	}


function ft_seeksize(entity, index, array) {
		if (entity == null || entity[0] != 'LINE')
		{
			print('no entity');
			return ;
		}

		log(entity)
		if (typeof arguments.callee.x_min == 'undefined'
			&& typeof entity[10] != null)
			arguments.callee.x_min = parseInt(entity[10]);
		else if (parseInt(arguments.callee.x_min) > parseInt(entity[10]))
			arguments.callee.x_min = parseInt(entity[10]);

		if (typeof arguments.callee.x_max == 'undefined'
			&& typeof entity[10] != null)
			arguments.callee.x_max = parseInt(entity[10]);
		else if (parseInt(arguments.callee.x_max) < parseInt(entity[10]))
			arguments.callee.x_max = parseInt(entity[10]);

		if (typeof arguments.callee.y_min == 'undefined'
			&& typeof entity[20] != null)
			arguments.callee.y_min = parseInt(entity[20]);
		else if (parseInt(arguments.callee.y_min) > parseInt(entity[20]))
			arguments.callee.y_min = parseInt(entity[20]);

		if (typeof arguments.callee.y_max == 'undefined'
			&& typeof entity[20] != null)
			arguments.callee.y_max = parseInt(entity[20]);
		else if (parseInt(arguments.callee.y_max) < parseInt(entity[20]))
			arguments.callee.y_max = parseInt(entity[20]);

		if (typeof arguments.callee.x_min == 'undefined'
			&& typeof entity[11] != null)
			arguments.callee.x_min = parseInt(entity[11]);
		else if (parseInt(arguments.callee.x_min) > parseInt(entity[11]))
			arguments.callee.x_min = parseInt(entity[11]);

		if (typeof arguments.callee.x_max == 'undefined'
			&& typeof entity[11] != null)
			arguments.callee.x_max = parseInt(entity[11]);
		else if (parseInt(arguments.callee.x_max) < parseInt(entity[11]))
			arguments.callee.x_max = parseInt(entity[11]);

		if (typeof arguments.callee.y_min == 'undefined'
			&& typeof entity[21] != null)
			arguments.callee.y_min = parseInt(entity[21]);
		else if (parseInt(arguments.callee.y_min) > parseInt(entity[21]))
			arguments.callee.y_min = parseInt(entity[21]);

		if (typeof arguments.callee.y_max == 'undefined'
			&& typeof entity[21] != null)
			arguments.callee.y_max = parseInt(entity[21]);
		else if (parseInt(arguments.callee.y_max) < parseInt(entity[21]))
			arguments.callee.y_max = parseInt(entity[21]);
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
	};

function ft_get_layer(layer_name) {
		if (!this.kt_layers[layer_name])
			this.kt_layers[layer_name] = new Kinetic.Layer(
				{
					name: layer_name,
				});
		return this.kt_layers[layer_name]
	};

function ft_shape(entity, index) {
		var x_min = this.ft_seeksize.x_min;
		var y_min = this.ft_seeksize.y_min;

		if (entity[8])
			var layer = this.ft_get_layer(entity[8]);
			this.kt_shapes[index] = new Kinetic.Shape({
			name: entity[5],
			x: 0,
			y: 0,
			fill: 'red',
			drawFunc: function(context) {
				context.moveTo(
					parseInt(entity[10]) - x_min,
					parseInt(entity[20]) - y_min
					);
				context.lineTo(
					parseInt(entity[11]) - x_min,
					parseInt(entity[21]) - y_min
					);
				context.stroke();
			}
		});
		layer.add(this.kt_shapes[index]);
	};

function ft_toKinetic() {
		log('x_min: ' + this.ft_seeksize.x_min)
		log('x_max: ' + this.ft_seeksize.x_max)
		log('y_min: ' + this.ft_seeksize.y_min)
		log('y_max: ' + this.ft_seeksize.y_max)
		log('height: ' + this.height)
		log('width: ' + this.width)
		if (document.getElementById('container'))
		{
			this.kt_stage = new Kinetic.Stage({
				container: 'container',
				width: this.width + 1,
				height: this.height + 1
			});
			this.kt_shapes = [];
			this.kt_layers = [];
			for (var i = 0; i < this.dt_entities.length; i++) {
				if (this.dt_entities[i][0] == 'LINE') // RESTRICTIONS HERE
					this.ft_shape(this.dt_entities[i], i);
			};
			for (i in this.kt_layers) {
				this.kt_stage.add(this.kt_layers[i]);
			};
		}
		else
			log('provide container plz')
	};

function DXF(BinaryString) {
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
	this.ft_get_layer = ft_get_layer;
	this.ft_shape = ft_shape;
	this.ft_toKinetic = ft_toKinetic;

	// CONSTRUCTOR
	this.ft_toarray();
	this.index = 0;
	this.ft_seeksize.x_min = undefined
	this.ft_seeksize.x_max = undefined
	this.ft_seeksize.y_min = undefined
	this.ft_seeksize.y_max
	this.current = this.ft_getduo();
	this.ft_parse();

	log(this);
}
