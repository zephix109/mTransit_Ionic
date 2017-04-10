var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shapeSchema = new Schema({

	shape_id : Number,
	shape_pt_lat : Number,
	shape_pt_lon : Number,
	shape_pt_sequence : Number

},{ collection : 'shapes' });


var Shape = mongoose.model('Shape', shapeSchema,'shapes');

module.exports = Shape;