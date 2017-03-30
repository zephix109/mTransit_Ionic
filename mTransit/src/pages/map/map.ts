import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StopInit } from '../../services/map/stops_Init';
//import { BusStop } from '../../components/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';
import { Http } from '@angular/http'
import { BusStopCatalog } from "../../components/bus-stop-catalog/bus-stop-catalog";
//import { GoogleMapsLatLng } from "ionic-native/dist/es5";
import { Geolocation, Geoposition, GoogleMapsEvent } from 'ionic-native';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  //busCatalog : BusStopCatalog
  //clickedCoord: GoogleMapsLatLng

  constructor(public navCtrl: NavController, public platform: Platform, public bus_stop_service: BusStopService, public stopinit : StopInit) {}

  ionViewDidLoad(){
    this.platform.ready().then(() => {
        
        //this.busCatalog = new BusStopCatalog(this.bus_stop);
        let mapLoaded = new Promise((resolve) => {
          setTimeout(resolve, 100, this.stopinit.mapIsLoaded());
          //setTimeout(resolve, 100, this.stopinit.loadMap());
        });

          let stopLoaded = this.bus_stop_service.load_Near_User();
          
          //console.log("Clicked coord is " + this.stopinit.clickedCoord.lat);
          //let targetStopLoad = this.bus_stop_service.load_Destination(this.stopinit.clickedCoord.lat, this.stopinit.clickedCoord.lng);


          Promise.all([
            mapLoaded,
            stopLoaded
            //targetStopLoad
            
          ]).then((result) => {

            let stops_near_me = result[1];

            console.log(this.stopinit.wantsToTravel);

            this.stopinit.showMarkers(stops_near_me);
            
            // for(let bss of bus_stop_service){
            // //for(let bss of result[1]){
            //   //console.log(bss.stop_name);
            //   let tempLatLng = new GoogleMapsLatLng(bss.stop_lat,bss.stop_lon);
            //   this.stopinit.loadMapMarkers(tempLatLng,bss.stop_name);

            // }
            this.stopinit.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {

              this.bus_stop_service.load_Destination(event.lat,event.lng).then(res => {
                this.stopinit.showMarkers(res);
              });

            });

          });

    });
  } 

  ionViewDidEnter(){
    this.platform.ready().then(() => {

        console.log("welcome to after enter!");
        this.bus_stop_service.setMap(this.stopinit);
    });
  }

  findNearBusStops(){
   // this.busCatalog.getNearBusStops();

  }

  cancel(){
    this.stopinit.cancelSearch();
  }

  allowClick(){
    //this.stopinit.selectDropOffLocation();
    console.log(this.stopinit.clickedCoord.lat + " ahaaaaaaaaaaaa " + this.stopinit.clickedCoord.lng);
  }
  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}