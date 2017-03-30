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

 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap

  constructor(public navCtrl: NavController, public platform: Platform, public busCatalog : BusStopCatalog) {}


    
  ionViewDidLoad(){
    this.platform.ready().then(() => {

      

      Geolocation.watchPosition().subscribe((position) => {
        //Load map and its observerable
        this.busCatalog.mapObj.loadMap(position);
        
        //Load bus stops near user and its observerable
        this.busCatalog.findNearBusStops();
        //console.log(this.busCatalog.mapObj.wantsToTravel);

        if(this.busCatalog.mapObj.wantsToTravel){
          console.log("Wants to travel");
          this.busCatalog.getDestinationArray();
        }

      }, (err) => {
        console.log(err);
      });      
      this.map = this.busCatalog.mapObj.map;
      
    });
  } 

  findNearBusStops(){
    this.busCatalog.getNearBusStops();

  }
  
  goToRating(){
      this.navCtrl.push(RatingPagePage);
  }

  cancel(){
    this.busCatalog.mapObj.wantsToTravel = false;
  }
  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}