var mongoose = require('mongoose');

var stopSchema = new mongoose.Schema({
	stop_id : Number,
	stop_code : Number,
	stop_name : String,
	stop_lat : Number,
	stop_lon : Number,
	stop_url : String,
	wheelchair_boarding : Number
	
},{ collection : 'stm_stops' });

stopSchema.methods.getName = function() {
	
	return this.stop_name;
}

stopSchema.methods.getLat = function() {
	
	return this.stop_lat;
}

stopSchema.methods.getLng = function() {
	
	return this.stop_lon;
}

module.exports = mongoose.model('Stop', stopSchema, 'stm_stops');