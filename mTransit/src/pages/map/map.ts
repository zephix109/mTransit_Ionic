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
 
  @ViewChild('map') public mapElement: ElementRef;
  @ViewChild('pleaseConnect') public pleaseConnect: ElementRef;

  public map: any;
  public mapInitialised: boolean = false;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop_service: BusStopService) {}
 
  public ionViewDidLoad(){
    this.platform.ready().then(() => {
        const mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        const stopLoaded = this.bus_stop_service.load_Near_User();
        const input = document.getElementById('searchInput');       

        Promise.all([
          mapLoaded,
          stopLoaded
        ]).then((result) => {
          this.maps.map.addListener('click', (pos) =>{
            this.maps.selectedPath = false;
            this.maps.clearDisplayedPaths();
            this.bus_stop_service.load_Destination(pos.latLng.lat(),pos.latLng.lng()).then(() => {
              this.maps.showMarkers(result);
            });
          });

          this.maps.loadSearchBar(input);
        });
    });
  } 
        
  public goToRating(){
    this.navCtrl.push(RatingPagePage);
  }
}