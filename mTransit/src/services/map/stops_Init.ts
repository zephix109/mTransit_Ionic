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
  markers: GoogleMapsMarker[] = [];
  markOptionsArr: GoogleMapsMarkerOptions[] = [];

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

        // this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
        //   this.clickedCoord = null;
        //   this.wantsToTravel = true;
        //   this.clickedCoord = new GoogleMapsLatLng(event.lat, event.lng);
        // });

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
        icon: '#000000',
        //map: this.map,
        //'animation': GoogleMapsAnimation.DROP,
        styles : {
          'text-align': 'center',
          'font-weight': 'bold',
          'color': 'blue'
        },
        'markerClick' : function(marker) {
          console.log("Clicked");
          //setTimeout(1000,)
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
     
      let marker = new GoogleMapsMarker(markerOptions);
      
        //this.map.on(GoogleMapsEvent.MAP_READY).subscribe((marker: GoogleMapsMarker) => {
        //  const marker: GoogleMapsMarker =  this.map.addMarker(markerOptions)
        //   .then((marker: GoogleMapsMarker) => {
      this.markers.push(marker);
      this.markOptionsArr.push(markerOptions);

      console.log("Marker length= " + this.markers.length);
        //  });
       // });

    }

    showMarkers1(dataArr:any){
      for(let data of dataArr){
        this.map.addMarker(data).then((marker: GoogleMapsMarker) => {
          marker.addListenerOnce(GoogleMapsEvent.MAP_CLICK).then(() => {
            marker.remove();
            console.log("removed")
          });
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            marker.showInfoWindow();
          });
        });  
      }
    }

    showMarkers(dataArr:any){
      for(let data of dataArr){
        let tempLatLng = new GoogleMapsLatLng(data.stop_lat,data.stop_lon);
        this.loadMapMarkers(tempLatLng,data.stop_name);   
      }
    }

    addToArray(dataArr:any){
      
      console.log("Before pushing: " + this.markers.length);

      while(this.markers.length > 0){
        this.markers.splice(-1,1);
        // let tempMarker = this.markers.pop();
        // tempMarker.remove();
        this.markOptionsArr.splice(-1,1);

      }

      this.map.clear();
      // for(let data of dataArr){
      //   this.markers.push(data);
      // }

     this.showMarkers(dataArr);

      // for(let data of this.markers){
      //   let tempLatLng = new GoogleMapsLatLng(data.stop_lat,data.stop_lon);
      //   this.loadMapMarkers(tempLatLng,data.stop_name);           
      // }
      
      console.log("After pushing: " + this.markers.length);
    }
    
    clearMarkers(){
      this.map.clear();
      this.map.empty();
    }

    cancelSearch(){
      this.wantsToTravel = false;
     // this.clearMarkers();
    }

    isMapLoaded(){
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          return true;
        });  

        return false;
    }

    

    

}
