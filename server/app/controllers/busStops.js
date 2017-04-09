var Stop = require('../models/busStop');
var async = require('async');
var nearBy = require('../formulas');

exports.getStops = function(req, res, next){
    
    
    Stop.find(function(err, Stops) {
 
        if (err){
            res.send(err);
        }

        var data = Stops;

            // 1 - Create and calculate 'distance' value for each item in the array
            nearBy.applyHaversine(data,req.params.lat,req.params.lng)
            // 2 - Sort array
            data.sort((busStopA,busStopB) => {
                return busStopA.distance - busStopB.distance;
            }),
            // 3 - Show only the first 50
            data = data.slice(0,10),

            console.log("DIstance test: " + data[0]["distance"]);

           res.json(data)
            
    });
 
}
