var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StopTimeSchema = new Schema({

	trip_id : String,
	arrival_time: Date,
	departure_time: Date,
	stop_id : Number,
	stop_sequence : Number

},{ collection : 'stop_times' });


module.exports = mongoose.model('StopTime', StopTimeSchema, 'stop_times');
