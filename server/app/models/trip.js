var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
	route_id : Number,
	service_id: String,
	trip_id: String,
	trip_headsign: String,
	direction_id: Number,
	shape_id: Number,
	wheelchair_accessible: Number,
	note_fr: String,
	note_en: String

});


var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;