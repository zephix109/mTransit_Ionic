var Driver = require('../models/driver');
 
exports.getDrivers = function(req, res, next){
 
    Driver.find(function(err, drivers) {
 
        if (err){
            res.send(err);
        }
 
        res.json(drivers);
 
    });
 
}
 
exports.createDriver = function(req, res, next){
 
    Driver.create({
        title : req.body.title
    }, function(err, driver) {
 
        if (err){
            res.send(err);
        }
 
        Driver.find(function(err, drivers) {
 
            if (err){
                res.send(err);
            }
 
            res.json(drivers);
 
        });
 
    });
 
}
 
exports.deleteDriver = function(req, res, next){
 
    Driver.remove({
        _id : req.params.driver_id
    }, function(err, driver) {
        res.json(driver);
    });
 
}