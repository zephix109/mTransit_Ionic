import { Storage } from '@ionic/storage';
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng, 
  Geolocation, 
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions,
  Geoposition,
  GoogleMapsAnimation
} from 'ionic-native';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BusStop } from '../../../components/bus-stop/bus-stop'

@Injectable()
export class StopInit {

  map: GoogleMap;
  mapActive: boolean
  clickedCoord: GoogleMapsLatLng;
  wantsToTravel: boolean;

  constructor(){
    console.log("welcome to stop init!");
    this.wantsToTravel = false;
    this.clickedCoord = new GoogleMapsLatLng(0, 0);
  }//End of constructor

  mapIsLoaded(){

    return new Promise((resolve) => {
      if(!this.mapActive){
        resolve(this.loadMap());
      }
    });
  }

  loadMap(){

    return new Promise((resolve) => {

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
          console.log('Observable Map is ready! and wants2travel is ' + this.wantsToTravel);

        });

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
          this.clickedCoord = null;
          this.wantsToTravel = true;
          this.clickedCoord = new GoogleMapsLatLng(event.lat, event.lng);
        });

        this.mapActive = true;

      }, (err) => {
        console.log(err);
      });

        resolve(true);

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
        icon: '#000',
        //'animation': GoogleMapsAnimation.DROP,
        styles : {
          'text-align': 'center',
          'font-weight': 'bold',
          'color': 'blue'
        },
        'markerClick' : function(marker) {
          marker.showInfoWindow();
          marker.setIcon("blue");
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
      //marker.set
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          this.map.addMarker(markerOptions);
        });

    }

    showMarkers(dataArr:any){
      for(let data of dataArr){
        let tempLatLng = new GoogleMapsLatLng(data.stop_lat,data.stop_lon);
        this.loadMapMarkers(tempLatLng,data.stop_name);   
      }
    }
    
    clearMarkers(){
      this.map.clear();
    }

    cancelSearch(){
      this.wantsToTravel = false;
      this.clearMarkers();
    }

    isMapLoaded(){
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          return true;
        });  

        return false;
    }

    

    

}
