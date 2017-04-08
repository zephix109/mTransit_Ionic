var Routes = require('../models/busRoute');
 
exports.getRoutes = function(req, res, next){
 
    Routes.find(function(err, Routes) {
 
        if (err){
            res.send(err);
        }
 
        res.json(Routes);
 
    });
 
}
 
exports.createRoutes = function(req, res, next){
 
    Route.create({
        title : req.body.title
    }, function(err, Route) {
 
        if (err){
            res.send(err);
        }
 
        Route.find(function(err, Routes) {
 
            if (err){
                res.send(err);
            }
 
            res.json(Routes);
 
        });
 
    });
 
}
 
exports.deleteRoute = function(req, res, next){
 
    Route.remove({
        _id : req.params.Route_id
    }, function(err, Route) {
        res.json(Route);
    });
 
}