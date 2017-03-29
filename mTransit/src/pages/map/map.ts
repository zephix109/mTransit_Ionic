import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RatingPagePage } from '../rating-page/rating-page';
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng, 
  Geolocation, 
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions,
  Geoposition
} from 'ionic-native';
import { BusStopCatalog } from "../../components/bus-stop-catalog/bus-stop-catalog";
import { StopInit } from '../../services/map/stops_Init';
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  busCatalog : BusStopCatalog


  constructor(public navCtrl: NavController, public platform: Platform, public stopinit : StopInit) {}

  ionViewDidLoad(){
    this.platform.ready().then(() => {
      if(this.stopinit.isMapLoaded){
        //this.busCatalog = new BusStopCatalog();
        //alert("Map loaded");
      } else {
        //alert("Map failed");
      }
      
    });
  } 

  findNearBusStops(){
    this.busCatalog.getNearBusStops();

  }
  
  goToRating(){
      this.navCtrl.push(RatingPagePage);
  }

  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}