var Shape = require('../models/shape');
var nearBy = require('../formulas');

 
exports.getShapesByLocation = function(req, res, next){

    Shape.find(function(err, allShapes) { 
	
        if (err){
            return next(err);
        }

        //Set our initial shape to a list shape first
        var shape = allShapes;

        nearBy.applyHaversineForShapes(shape,req.params.lat,req.params.lng);

        shape.sort((shapeA,shapeB) => {
            return shapeA.distance - shapeB.distance;
        });

        shape = shape.splice(0,1);
        
       // console.log("Distance: " + shape[0]["distance"]);

       // console.log("Returned shape Lat:" +shape[0]["shape_pt_lat"] + " input lat: "+ req.params.lat);

        Shape.find({
            shape_id : shape[0]["shape_id"]
        },function(err, shapes) { 
        
            if (err){
                console.log("None found");
                res.send(err);
            }

            shape.sort((shapeA,shapeB) => {
                return shapeA.shape_pt_sequence - shapeB.shape_pt_sequence;
            });        

            res.json(shapes);
    
        });
 
    });
 
} 
 
