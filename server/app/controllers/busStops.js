var Stop = require('../models/busStop');
var async = require('async');

exports.getStops = function(req, res, next){
    
    
    Stop.find(function(err, Stops) {
 
        if (err){
            res.send(err);
        }

        var data = Stops;

            // 1 - Create and calculate 'distance' value for each item in the array
            applyHaversine(data,req.params.lat,req.params.lng)
            // 2 - Sort array
            data.sort((busStopA,busStopB) => {
                return busStopA.distance - busStopB.distance;
            }),
            // 3 - Show only the first 50
            data = data.slice(0,10),

           res.json(data)
            
    });
 
}

applyHaversine = function(busStopJSONarr, userLat, userLon){

      var usersLocation = {

          lat: userLat, 
          lng: userLon

      };

      busStopJSONarr.map((location) => {
  
        var placeLocation = {
          lat: location.stop_lat,
          lng: location.stop_lon
        };
    
        location.distance = getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'km'
          ).toFixed(2);

      });
    
      //return locations;


  }

  //Calculation for Haversine formulas
getDistanceBetweenPoints = function(start, end, units){
 
        var earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        var R = earthRadius[units || 'km'];
        var lat1 = start.lat;
        var lon1 = start.lng;
        var lat2 = end.lat;
        var lon2 = end.lng;
 
        var dLat = toRad((lat2 - lat1));
        var dLon = toRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
 
        return d;
 
}

 toRad = function(x){
      return x * Math.PI / 180;
}