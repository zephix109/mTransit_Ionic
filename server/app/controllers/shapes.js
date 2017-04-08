var Shape = require('../models/shape');
 
exports.getShapes = function(req, res, next){
 
    Shape.find(function(err, shapes) {
 
        if (err){
            res.send(err);
        }
 
        res.json(shapes);
 
    });
 
}
 
exports.createShape = function(req, res, next){
 
    Shape.create({
        title : req.body.title
    }, function(err, shape) {
 
        if (err){
            res.send(err);
        }
 
        Shape.find(function(err, shapes) {
 
            if (err){
                res.send(err);
            }
 
            res.json(shapes);
 
        });
 
    });
 
}
 
exports.deleteShape = function(req, res, next){
 
    Shape.remove({
        _id : req.params.shape_id
    }, function(err, shape) {
        res.json(shape);
    });
 
}