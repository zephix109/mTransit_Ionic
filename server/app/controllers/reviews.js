var Review = require('../models/review');
 
exports.getReviews = function(req, res, next){
 
    Review.find(function(err, reviews) {
 
        if (err){
            res.send(err);
        }
 
        res.json(reviews);
 
    });
 
}
 
exports.createReview = function(req, res, next){
 
    Review.create({
        title : req.body.title
    }, function(err, review) {
 
        if (err){
            res.send(err);
        }
 
        Review.find(function(err, reviews) {
 
            if (err){
                res.send(err);
            }
 
            res.json(reviews);
 
        });
 
    });
 
}
 
exports.deleteReview = function(req, res, next){
 
    Review.remove({
        _id : req.params.review_id
    }, function(err, review) {
        res.json(review);
    });
 
}