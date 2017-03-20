import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StopInit } from '../../services/map/stops_Init';
import { BusStop } from '../../components/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';
import { Http } from '@angular/http'
import { BusStopCatalog } from "../../components/bus-stop-catalog/bus-stop-catalog";
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  busCatalog : BusStopCatalog

  constructor(public navCtrl: NavController, public platform: Platform, public bus_stop: BusStopService, public stopinit : StopInit) {}

  ionViewDidLoad(){
    this.platform.ready().then(() => {
      if(this.stopinit.isMapLoaded){
        //this.busCatalog = new BusStopCatalog(this.bus_stop);'
        alert("Map loaded");
      } else {
        alert("Map failed");
      }
      
    });
  } 

  findNearBusStops(){
    this.busCatalog.getNearBusStops();

  }

  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}