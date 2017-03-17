import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StopInit } from '../../services/map/stops_Init';
import { BusStopCatalog } from '../../components/bus-stop-catalog';
import { BusStop } from '../../components/bus-stop';
import { Http } from '@angular/http'
import { GoogleMaps } from '../../providers/google-maps';
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html',
  providers: [StopInit]
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop: BusStopService, public stopinit : StopInit) {}

  ionViewDidLoad(){
    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let locationsLoaded = this.bus_stop.load();
      Promise.all([
        mapLoaded,
        locationsLoaded
      ]).then((result) => {
        let locations = result[1];
        for(let location of locations){
            this.maps.addMarker(location.latitude, location.longitude);
        }
      }); 
    });
  } 

  showStops(){
    this.stopinit.showStops();
  }

  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}