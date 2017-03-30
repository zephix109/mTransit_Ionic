import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition } from 'ionic-native';
import { Platform } from 'ionic-angular';
//import { StopInit } from '../services/map/stops_Init';

@Injectable()
export class BusStopService {

  zone: NgZone;
  data: any;
  data_destination: any;
  user_lat : number;
  user_lon : number;
  watch: any;
  //mapObj: StopInit;

  constructor(public http: Http, public pf: Platform ) {

    console.log("Hello from BusStopService contructor");

  }

  //Load closest 20 stm bus stops near the user's location.
  load_Near_User() {

    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    // don't have the data yet
    return new Promise(resolve => {

      var url = '../assets/bus_stops/stm_stops.json';
      //this.pf.is('cordova') && 
      if (this.pf.is('android')) {
        url = "/android_asset/www/src/" + url;
      }

      this.http.get(url)
        .map(res => res.json().bus_stops)
        .subscribe(data => {

          this.watch = Geolocation.watchPosition().subscribe((position: Geoposition) => {

            this.user_lat = position.coords.latitude;
            this.user_lon = position.coords.longitude;            
            console.log("Observable from near user");

            Promise.all([
              // 1 - Create and calculate 'distance' value for each item in the array
              this.applyHaversine( data, this.user_lat, this.user_lon ),  
              // 2 - Sort array
              data.sort((busStopA,busStopB) => {
                return busStopA.distance - busStopB.distance;
              }),
              // 3 - Show only the first 20
              this.data = data.slice(0,20),

              resolve(this.data)
              
            ]);

            // if(this.mapObj.wantsToTravel){

            //   Promise.resolve(this.load_Destination(this.mapObj.clickedCoord.lat,this.mapObj.clickedCoord.lng))
            //     .then(data => {
            //       this.mapObj.showMarkers(data);
            //     });
            // } else {

            //   this.data_destination = null;
            //   this.mapObj.clearMarkers();
              
            // }

          }, (err) => {
            console.log(err);
          });

      });
          
        
    });
  }

  /*
  *
  * Load closest bus stops around clicked location
  *
  */
  load_Destination(lat: number, lng: number) {

    if (this.data_destination) {
      console.log("Destinations already exist");
      return Promise.resolve(this.data_destination);
    }
 
    // don't have the data yet
    return new Promise(resolve => {

      console.log("Getting new destination");

      var url = '../assets/bus_stops/stm_stops.json';
      if (this.pf.is('android')) {
        url = "/android_asset/www/src/" + url;
      }

      this.http.get(url)
        .map(res => res.json().bus_stops)
        .subscribe(data => {

            Promise.all([
              // 1 - Create and calculate 'distance' value for each item in the array
              this.applyHaversine( data, lat, lng ),  
              // 2 - Sort array
              data.sort((busStopA,busStopB) => {
                return busStopA.distance - busStopB.distance;
              }),
              // 3 - Show only the first 50
              this.data_destination = data.slice(0,10),

              resolve(this.data_destination)
              
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

  // setMap(newMap: StopInit){
  //     this.mapObj = newMap;
  // }
  
}

