var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({
	stop_time : Number,
	stop_code : Number

});


var Route = mongoose.model('Route', routeSchema);

module.exports = Route;