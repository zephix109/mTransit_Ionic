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

var Stop = mongoose.model('Stop', stopSchema);

stopSchema.methods.getName = function() {
	
	return this.stop_name;
}

/*
stopSchema.methods.getName = function(cb) {
	return this.model('Stop').find({ stop_name: this.stop_name }, cb);
};

stopSchema.methods.getLat = function(cb) {
	return this.model('Stop').find({ stop_lat: this.stop_lat }, cb);
};

stopSchema.methods.getLon = function(cb) {
	return this.model('Stop').find({ stop_lon: this.stop_lon }, cb);
};

stopSchema.methods.getWheelchair = function(cb) {
	return this.model('Stop').find({ wheelchair_boarding: this.wheelchair_boarding }, cb);
};*/

module.exports = Stop;