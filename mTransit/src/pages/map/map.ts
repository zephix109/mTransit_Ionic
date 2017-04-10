import { Component, ElementRef, ViewChild } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { RatingPagePage } from '../rating-page/rating-page';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  map: any;
  mapInitialised: boolean = false;
 
  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop_service: BusStopService) { }
   
  getmymap(){
    return this.maps;
  }

  ionViewDidLoad(){

    console.log("my map is "+this.maps);
    var input = document.getElementById("searchInput");
    var gomap = this.maps;
    var montrealBounds = new google.maps.LatLngBounds( 
        new google.maps.LatLng(45.383291, -74.011961),
        new google.maps.LatLng(45.716133, -73.447467) 
    );
    var options = {
      strictBounds: true,
      bounds: montrealBounds
    }
    var autocomplete = new google.maps.places.Autocomplete(input, options);
  
    autocomplete.addListener('place_changed', function() {
      
      gomap.goToPlace(autocomplete.getPlace())
    
  });
    
    this.platform.ready().then(() => {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let stopLoaded = this.bus_stop_service.load_Near_User();       

        Promise.all([
          mapLoaded,
          stopLoaded
      
        ]).then((result) => {

          console.log("Result length = " + result[1].length);

          this.maps.map.addListener('click', (pos) =>{
            this.maps.selectedPath = false;
            this.maps.clearDisplayedPaths();
            this.bus_stop_service.load_Destination(pos.latLng.lat(),pos.latLng.lng()).then((result) => {
              this.maps.showMarkers(result);
            });
          });

      }).catch( rej => {
          console.log(rej);
        });
      });
  }

  goToRating() {
    this.navCtrl.push(RatingPagePage);
  }

}