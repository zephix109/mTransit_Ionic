var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	rating : {
		type: Number,
		min: 1,
		max: 5,
		required: [true, 'Please enter a rating']
	},	
	comments : String
},{ collection : 'reviews' });

module.exports = mongoose.model('Review', reviewSchema);