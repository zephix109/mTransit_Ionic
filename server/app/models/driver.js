var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driverSchema = new Schema({
	driver_id : Number,
	bus_code : Number,
	stm_code : Number,
});

var Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;