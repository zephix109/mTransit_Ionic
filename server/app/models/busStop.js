var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stopSchema = new Schema({
	stop_id : Number,
	stop_code : Number,
	stop_name : String,
	stop_lat : Number,
	stop_lon : Number,
	stop_url : String,
	wheelchair_boarding : Number
	
});

stopSchema.methods.getName = function() {
	
	return this.stop_name;
}

var Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;