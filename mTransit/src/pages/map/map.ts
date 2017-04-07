import { Component, ElementRef, ViewChild } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { RatingPagePage } from '../rating-page/rating-page';
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  map: any;
  mapInitialised: boolean = false;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop_service: BusStopService) {}
 
  ionViewDidLoad(){
    this.platform.ready().then(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let stopLoaded = this.bus_stop_service.load_Near_User();
        let input = document.getElementById('searchInput');       

        Promise.all([
          mapLoaded,
          stopLoaded
        ]).then((result) => {
          this.maps.map.addListener('click', (pos) =>{
            this.maps.selectedPath = false;
            this.maps.clearDisplayedPaths();
            this.bus_stop_service.load_Destination(pos.latLng.lat(),pos.latLng.lng()).then((result) => {
              this.maps.showMarkers(result);
            });
          });

          this.maps.loadSearchBar(input);
        }).catch( rej => {});
    });
  }
        
  goToRating(){
    this.navCtrl.push(RatingPagePage);
  }
 
}