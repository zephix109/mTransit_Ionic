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
    console.log("We're in");
    var comment = req.body.comment;
    var ratings = req.body.rating;
    
    var review = new Review({
        comments : comment,
        rating: ratings
    });

    Review.create(review);

    console.log("review created");


    // Review.create({
    //     comments : req.body.comment,
    //     rating: req.body.rating,
    // }, function(err, review) {
 
    //     if (err){
    //         res.send(err);
    //     }
        
    //     console.log("review Created");
    //     // Review.find(function(err, reviews) {
 
    //     //     if (err){
    //     //         res.send(err);
    //     //     }
 
    //     //     res.json(reviews);
 
    //     // });
 
    // });
 
}
 
exports.deleteReview = function(req, res, next){
 
    Review.remove({
        _id : req.params.review_id
    }, function(err, review) {
        res.json(review);
    });
 
}