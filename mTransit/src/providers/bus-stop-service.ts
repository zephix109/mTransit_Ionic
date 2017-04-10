import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Formulas } from './formulas';

@Injectable()
export class BusStopService {

  public zone: NgZone;
  public data: any;
  public data_destination: any;
  public user_lat: number;
  public user_lon: number;
  public watch: any;


  constructor(public http: Http, public pf: Platform, public formulas: Formulas) {
    //console.log("Hello from BusStopService contructor");
  }

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

          //this.watch = Geolocation.watchPosition().subscribe((position: Geoposition) => {
          Geolocation.getCurrentPosition().then((position) => {

            this.user_lat = position.coords.latitude;
            this.user_lon = position.coords.longitude;
            //console.log("Observable from near user");

            Promise.all([
              // 1 - Create and calculate 'distance' value for each item in the array
              this.formulas.applyHaversine(data, this.user_lat, this.user_lon),
              // 2 - Sort array
              data.sort((busStopA, busStopB) => {
                return busStopA.distance - busStopB.distance;
              }),
              // 3 - Show only the first 20
              this.data = data.slice(0, 20),
              resolve(this.data)
            ]);
          }, (err) => {
            //console.log(err);
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
      //console.log("Getting new destination");

      let url = '../assets/bus_stops/stm_stops.json';
      if (this.pf.is('android')) {
        url = "/android_asset/www/src/" + url;
      }

      this.http.get(url)
        .map(res => res.json().bus_stops) //use this to test with file in doc
        .subscribe(data => {

          Promise.all([
            // 1 - Create and calculate 'distance' value for each item in the array
            this.formulas.applyHaversine(data, lat, lng),
            // 2 - Sort array
            data.sort((busStopA, busStopB) => {
              return busStopA.distance - busStopB.distance;
            }),
            // 3 - Show only the first 20
            this.data_destination = data.slice(0, 20),
            resolve(this.data_destination)
          ]);
          this.data_destination = data;
          resolve(data);
        });
    });
  }
}

