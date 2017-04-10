import { Component, ElementRef, ViewChild } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { RatingPagePage } from '../rating-page/rating-page';

declare const google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') public mapElement: ElementRef;
  @ViewChild('pleaseConnect') public pleaseConnect: ElementRef;

  public map: any;
  public mapInitialised: boolean = false;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public bus_stop_service: BusStopService) { }

  public ionViewDidLoad() {

    //console.log("my map is "+this.maps);
    const input = document.getElementById("searchInput");
    const gomap = this.maps;
    const montrealBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(45.383291, -74.011961),
      new google.maps.LatLng(45.716133, -73.447467)
    );
    const options = {
      strictBounds: true,
      bounds: montrealBounds
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function () {

      gomap.goToPlace(autocomplete.getPlace());

    });

    this.platform.ready().then(() => {

      const mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      const stopLoaded = this.bus_stop_service.load_Near_User();

      Promise.all([
        mapLoaded,
        stopLoaded

      ]).then((result) => {

        //console.log("Result length = " + result[1].length);
        this.maps.map.addListener('click', (pos) => {
          this.maps.selectedPath = false;
          this.maps.clearDisplayedPaths();
          this.bus_stop_service.load_Destination(pos.latLng.lat(), pos.latLng.lng()).then((result) => {
            this.maps.showMarkers(result);
          });
        });
      }).catch(rej => {
        //console.log(rej);
      });
    });
  }

  public goToRating() {
    this.navCtrl.push(RatingPagePage);
  }

}