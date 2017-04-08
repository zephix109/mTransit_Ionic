var Stop = require('../models/busStop');
 
exports.getStops = function(req, res, next){
 
    Stop.find(function(err, Stops) {
 
        if (err){
            res.send(err);
        }
 
        res.json(Stops);
 
    });
 
}
 
exports.createStop = function(req, res, next){
 
    Stop.create({
        title : req.body.title
    }, function(err, Stop) {
 
        if (err){
            res.send(err);
        }
 
        Stop.find(function(err, Stops) {
 
            if (err){
                res.send(err);
            }
 
            res.json(Stops);
 
        });
 
    });
 
}
 
exports.deleteStop = function(req, res, next){
 
    Stop.remove({
        _id : req.params.Stop_id
    }, function(err, Stop) {
        res.json(Stop);
    });
 
}