import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BusStop } from "../components/bus-stop/bus-stop";
import { BusStopCatalog } from "../components/bus-stop-catalog/bus-stop-catalog";
import { Geolocation, Geoposition , BackgroundGeolocation} from 'ionic-native';

@Injectable()
export class BusStopService {

  zone: NgZone;
  data: any;
  busCatalog: BusStopCatalog;
  user_lat : number;
  user_lon : number;
  watch: any;

  constructor(public http: Http) {

    console.log("Hello from BusStopService contructor");

  }

  //Load stm bus stop from JSON file into array.
  //Current problem surrounds Goelocation that surrounds this.applyHaversine(...)
  load() {
    if (this.data) {
      return Promise.resolve(this.data);

    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('../assets/bus_stops/stm_stops.json')
        .map(res => res.json().bus_stops)
        .subscribe(data => {

        //Lat = 45.546645;
        //Long = -73.536455;

        Promise.all([
          console.log("1"),

          //PROBLEM STARTS HERE
          this.watch = Geolocation.watchPosition().filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
            this.user_lat = position.coords.latitude;
            this.user_lon = position.coords.longitude;            
            this.applyHaversine( data, this.user_lat, this.user_lon ); //This works by itself when its not surrounded by Geolocation
          }, (err) => {
            console.log(err);
          }),

          console.log("2"),
          data.sort((busStopA,busStopB) => {
            return busStopA.distance - busStopB.distance;
          }),
          console.log("3"),
          this.data = data.slice(0,50),
          console.log("4"),
          resolve(this.data)
        ]);
 
          
        });
    });
  }

  /*
  * Function applyHaversine
  *
  * Input:
  *  - Array representing bus_stop JSON list
  *  - user's current latitude
  *  - user's current longitude
  *
  * Function iterates through every item in the Array and creates a new field named "distance" which is the distance between 
  * the user's location and the item's location. This calculation is called the Haversine formulas which is called at this.getDistanceBetweenPoints
  */
  applyHaversine(busStopJSONarr, userLat : number, userLon : number){
    
      console.log(userLat);
      console.log(userLon);
      let usersLocation = {

          lat: userLat, 
          lng: userLon

      };

      busStopJSONarr.map((location) => {
  
        let placeLocation = {
          lat: location.stop_lat,
          lng: location.stop_lon
        };
    
        location.distance = this.getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'km'
          ).toFixed(2);

      });
    
      //return locations;


  }

  //Calculation for Haversine formulas
  getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'km'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
  }
 
  toRad(x){
      return x * Math.PI / 180;
  }

}

