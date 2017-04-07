import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Injectable()
export class BusStopService {

  public zone: NgZone;
  public data: any;
  public data_destination: any;
  public user_lat : number;
  public user_lon : number;
  public watch: any;


  constructor(public http: Http, public pf: Platform ) {}

  //Load closest 10 stm bus stops near the user's location.
  public load_Near_User() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    // don't have the data yet
    return new Promise(resolve => {
      let url = '../assets/bus_stops/stm_stops.json'; 
      if (this.pf.is('android')) {
        url = "/android_asset/www/src/" + url;
      }

      this.http.get(url)
        .map(res => res.json().bus_stops)
        .subscribe(data => {

          Geolocation.getCurrentPosition().then((position) => {

            this.user_lat = position.coords.latitude;
            this.user_lon = position.coords.longitude;            

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
          });
      });
    });
  }

  /*
  *
  * Load closest bus stops around clicked location
  *
  */
  public load_Destination(lat: number, lng: number) {
    // don't have the data yet
    return new Promise(resolve => {
      let url = '../assets/bus_stops/stm_stops.json';
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
  public applyHaversine(busStopJSONarr, userLat : number, userLon : number){

      const usersLocation = {
          lat: userLat, 
          lng: userLon
      };

      busStopJSONarr.map((location) => {
        const placeLocation = {
          lat: location.stop_lat,
          lng: location.stop_lon
        };
    
        location.distance = this.getDistanceBetweenPoints(
            usersLocation,
            placeLocation,
            'km'
          ).toFixed(2);
      });
  }

  //Calculation for Haversine formulas
  public getDistanceBetweenPoints(start, end, units){
        const earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        const R = earthRadius[units || 'km'];
        const lat1 = start.lat;
        const lon1 = start.lng;
        const lat2 = end.lat;
        const lon2 = end.lng;
 
        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
 
        return d;
  }
 
  public toRad(x){
      return x * Math.PI / 180;
  }

}

