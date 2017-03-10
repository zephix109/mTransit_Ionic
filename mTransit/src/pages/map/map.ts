import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google: any;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})


export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
      platform.ready().then(() => {
         this.loadMap(); 
      });
  }

  loadMap(){

    //Geolocation.watchPosition().subscribe((position) => {
    Geolocation.getCurrentPosition().then((position) => {

      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
    
      //this.map = new GoogleMap('map', 

      let mapOptions = {
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
      }
    
 
    }, (err) => {
      console.log(err);
    });


      // //Create new marker
      // let markerOptions: GoogleMapsMarkerOptions = {
      //   position: location,
      //   title: 'Ionic'
      // };

      // this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
      //       marker.showInfoWindow();
      // });

  }


  addMarker(){
  
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    // let content = "<h4>Information!</h4>";          
  
    // this.addInfoWindow(marker, content);
  
  }

  addInfoWindow(marker, content){
  
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }
}