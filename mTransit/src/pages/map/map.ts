import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StopInit } from '../../services/map/stops_Init';
//import { BusStop } from '../../components/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';
import { Http } from '@angular/http'
import { BusStopCatalog } from "../../components/bus-stop-catalog/bus-stop-catalog";
import { GoogleMapsLatLng } from "ionic-native/dist/es5";
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  //busCatalog : BusStopCatalog

  constructor(public navCtrl: NavController, public platform: Platform, public bus_stop_service: BusStopService, public stopinit : StopInit) {}

  ionViewDidLoad(){
    this.platform.ready().then(() => {
     
        //this.busCatalog = new BusStopCatalog(this.bus_stop);
        let mapLoaded = this.stopinit.loadMap();
        let stopLoaded = this.bus_stop_service.load();

        Promise.all([
          mapLoaded,
          stopLoaded
        ]).then((result) => {

          let bus_stop_service = result[1];

          for(let bss of bus_stop_service){
            
            let tempLatLng = new GoogleMapsLatLng(bss.stop_lat,bss.stop_lon);

            this.stopinit.loadMapMarkers(tempLatLng,bss.stop_name);
          }

        })


    });
  } 

  findNearBusStops(){
   // this.busCatalog.getNearBusStops();

  }

  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}