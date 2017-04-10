var st = require('../models/stopTime');


//Get list of bus stops corresponding to trip
exports.getStopTimes = function(req, res, next){
 
    st.find({trip_id : req.params.trip_id},function(err, busTimes) {
 
        if (err){
            res.send(err);
        }
        
        busTimes.toArray(function(err,docs){


        });

        res.json(busTimes);
 
    });
 
}

exports.getTrip = function(req,res,next){

    st.findOne({stop_id : req.params.stop_id}, function(err, existingStopTime){

        if(existingStopTime){
            res/json(existingStopTime);
        }
        
    });

    
}



