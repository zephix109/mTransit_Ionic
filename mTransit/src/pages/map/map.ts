import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
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
  templateUrl: 'map.html'
})
export class MapPage {
 
  map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform) {
      platform.ready().then(() => {
          this.loadMap();
      });
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

      //Create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: location,
        title: 'Ionic'
      };

      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
      });
    }, (err) => {
      console.log(err);
    });

  }
}