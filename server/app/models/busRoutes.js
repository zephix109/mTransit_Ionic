var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({
	stop_id : Number,
	stop_code : Number,
	stop_name : String,
	stop_lat : Number,
	stop_lon : Number,
	stop_url : String,
	wheelchair_boarding : Number
	
});


var Route = mongoose.model('Route', routeSchema);

module.exports = Route;