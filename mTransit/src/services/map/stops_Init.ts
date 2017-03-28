import { Storage } from '@ionic/storage';
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng, 
  Geolocation, 
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions,
  Geoposition
} from 'ionic-native';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BusStop } from '../../../components/bus-stop/bus-stop'

@Injectable()
export class StopInit {

  map: GoogleMap;

  constructor(){ }//End of constructor

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

      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((location) => {
        //Geolocation.getCurrentPosition().then()
        //console.log(position.latitude);
        
        this.map.moveCamera("clicked");
      });

    }, (err) => {
      console.log(err);
    });
  }

  /*
  * function loadMapMarkers 
  * 
  * Takes as input:
  * 1 - stop_lat_lng as a GoogleMapsLatLng object containing Latitude and Longitude values
  * 2- stop_name as String and is name of the road of which the bus stop is located on.
  *
  * This function creates a marker on to this.map object. Clicking the marker would open the markers
  * infoWindow, prompting the user to confirm their bus ride confirmation. Clicking the infoWindow 
  * would confirm the user to this bus stop and any bus that would eventually pass.
  */
  loadMapMarkers(stop_lat_lng : GoogleMapsLatLng, stop_name : string ) {
    
      let markerOptions: GoogleMapsMarkerOptions = {
        position: stop_lat_lng,
        title: stop_name,
        snippet: "List bus numbers here",
        styles : {
          'text-align': 'center',
          'font-weight': 'bold',
          'color': 'blue'
        },
        'markerClick' : function(marker) {
          marker.showInfoWindow();
        },
        'infoClick': function(marker) {
          var confirmation_status = window.confirm("Are you sure you want to select this destination?\n\nAt: " + stop_name);
          if( confirmation_status){
            alert("You're booked!");
          } else {
            marker.hideInfoWindow();
          }
        }

      };

      
      this.map.addMarker(markerOptions);

    }

    // /*
    // * function showStops would display all bus stops within a certain vicinity of the user
    // */
    // showStops(){
      
    //   var all_stops = [];

    //   //let stop1 = new BusStop{};

    //   let testLocation = new GoogleMapsLatLng(45.495677,-73.579057);
    //   let testStop_name = "Station Guy-Concordia";

    //   let testLocation2 = new GoogleMapsLatLng(45.495939,-73.579665);
    //   let testStop_name2 = "Station Guy-Concordia (Guy / De Maisonneuve)";

    //   let testLocation3 = new GoogleMapsLatLng(45.497525,-73.578074);
    //   let testStop_name3 = "De Maisonneuve / Bishop";

    //   let testLocation4 = new GoogleMapsLatLng(45.495301,-73.578222);
    //   let testStop_name4 = "Station Guy-Concordia (Guy / De Maisonneuve)";

    //   this.loadMapMarkers(testLocation, testStop_name);
    //   this.loadMapMarkers(testLocation2, testStop_name2);
    //   this.loadMapMarkers(testLocation3, testStop_name3);
    //   this.loadMapMarkers(testLocation4, testStop_name4);
    
    // }

    selectDropOffLocation(){}

    isMapLoaded(){
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        return true;
      });  

      return false;

    }

    

    

}
