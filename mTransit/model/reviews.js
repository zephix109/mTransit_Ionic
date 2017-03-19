var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	rating : Number,
	comments : String
});

/*
var Review = mongoose.model('Review', reviewSchema);

stopSchema.methods.getName = function() {
	
	return this.stop_name;
}*/

module.exports = mongoose.model('Review', reviewSchema);