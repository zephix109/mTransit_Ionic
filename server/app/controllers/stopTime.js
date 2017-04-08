var st = require('../models/stopTime');


//Get list of bus stops corresponding to trip
exports.getStopTimes = function(req, res, next){
 
    st.find({trip_id : req.params.trip_id},function(err, busTimes) {
 
        if (err){
            res.send(err);
        }
        
        

        res.json(busTimes);
 
    });
 
}



