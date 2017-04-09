var Shape = require('../models/shape');
 
exports.getShapesById = function(req, res, next){
 
	Shape.find({shape_id : req.params.shape_id},function(err, shapes) { 
	
        if (err){
            res.send(err);
        }
        
        res.json(shapes);
 
    });
 
}
 
exports.getShapesByLocation = function(req, res, next){
 
	Shape.find({shape_pt_lat : req.params.shape_pt_lat, shape_pt_lon: req.params.shape_pt_lon},function(err, shapes) { 
	
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