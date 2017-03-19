var mongoose = require('mongoose');
mongoose.connect('mongodb://dbuser5:0Be5Jh58w@192.175.117.180:27018/mydb5')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Review = require('./model/reviews');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

//routes that end with reviews
router.route('/reviews')

//create reviews
	.post(function(req,res){
		
		var review = new Review();
		review.rating = req.body.rating;
		review.comment = req.body.comment;
		
		//save review
		review.save(function(err){
			if(err)
				res.send(err);
			
			res.json({message: 'Review created!'});
		});
	})
	
	//get all reviews
	.get(function(req,res){
		Review.find(function(err,reviews){
			if(err)
				res.send(err);
			
			res.json(reviews);
		});
	});

//routes that end in /reviews/reviews_id

router.route('/reviews/:reviews_id')

    // get the review with he corresponding id
    .get(function(req, res) {
        Review.findById(req.params.review_id, function(err, review) {
            if (err)
                res.send(err);
            res.json(review);
        });
    });	
	
	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//router.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);