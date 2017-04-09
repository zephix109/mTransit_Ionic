var Trip = require('../models/trip');
 
exports.getTrips = function(req, res, next){
 
    Trip.find(function(err, trips) {
 
        if (err){
            res.send(err);
        }
 
        res.json(trips);
 
    });
 
}
 
exports.createTrip = function(req, res, next){
 
    Trip.create({
        title : req.body.title
    }, function(err, trip) {
 
        if (err){
            res.send(err);
        }
 
        Trip.find(function(err, trips) {
 
            if (err){
                res.send(err);
            }
 
            res.json(trips);
 
        });
 
    });
 
}
 
exports.deleteTrip = function(req, res, next){
 
    Trip.remove({
        _id : req.params.trip_id
    }, function(err, trip) {
        res.json(trip);
    });
 
}