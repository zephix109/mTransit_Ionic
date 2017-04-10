exports.applyHaversine = function(arrayToModify, userLat, userLon){

      var usersLocation = {

          lat: userLat, 
          lng: userLon

      };

      arrayToModify.map((location) => {
  
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
    


}

exports.applyHaversineForShapes = function(arrayToModify, userLat, userLon){

      var usersLocation = {

          lat: userLat, 
          lng: userLon

      };

      arrayToModify.map((location) => {
  
        var placeLocation = {
          lat: location.shape_pt_lat,
          lng: location.shape_pt_lon
        };
    
        location.distance = getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'km'
          ).toFixed(2);

      });
    


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