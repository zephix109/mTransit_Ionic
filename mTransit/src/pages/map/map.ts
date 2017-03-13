import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BusStopCatalog } from '../../components/bus-stop-catalog';
import { BusStop } from '../../components/bus-stop';
import { BusStopService } from '../..providers/bus-stop-service';
import { Http } from '@angular/http'
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng, 
  Geolocation, 
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions,
  Geoposition
} from 'ionic-native';
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html',
  providers: [BusStopService]
})
export class MapPage {
 
  map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform) {
      platform.ready().then(() => {
          this.loadMap();
      });
      this.loadMapMarkers();
  }

  loadMap(){

    Geolocation.watchPosition().subscribe((position) => {
      let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude); 
    
      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });
    
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });

    }, (err) => {
      console.log(err);
    });
  }

  loadMapMarkers() {
    let busStopCatalog = new BusStopCatalog();
    

    let markerOptions: GoogleMapsMarkerOptions = {
      position: ,
      title: ''
    };

    this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
    });
    }
}