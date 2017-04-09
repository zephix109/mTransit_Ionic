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


  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop_service: BusStopService) {

  }
 
  ionViewDidLoad(){
 
    var input = document.getElementById("searchInput");

    var autocomplete = new google.maps.places.Autocomplete(input);

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

        this.maps.loadSearchBar(input);

      }).catch(rej => {
        console.log(rej);
      });

    });
  }

  goToRating() {
    this.navCtrl.push(RatingPagePage);
  }

}