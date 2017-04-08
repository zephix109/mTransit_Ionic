var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shapeSchema = new Schema({
	trip_id : String,
	arrival_time : String,
	departure_time : String,
	stop_id : Number,
	stop_sequence : Number

});


var Shape = mongoose.model('Shape', shapeSchema);

module.exports = Shape;