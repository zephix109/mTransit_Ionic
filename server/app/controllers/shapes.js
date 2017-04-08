var Shape = require('../models/shape');
 
exports.getShapesById = function(req, res, next){
 
    Shape.find(function(err, shapes) {
 
        if (err){
            res.send(err);
        }
 
        res.json(shapes);
 
    });
 
}
