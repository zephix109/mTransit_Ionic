import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation, GoogleMapsLatLng } from 'ionic-native';
 
declare var google;
 
@Injectable()
export class GoogleMaps {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any[] = [];
  apiKey: string;//"AIzaSyApveMIrtj5hoxWezmwCNbGLjKwhxsd3W0";
  myLocation: any;

  directionsService: any;
  directionsDisplay: any;

  constructor(public connectivityService: Connectivity) {
     //google.maps.event.addDomListener(window, "load", this.initMap());
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
    //eturn this.initMap();
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            console.log(this.apiKey);
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
 
        } 
      }
      else {
 
        if(this.connectivityService.isOnline()){
          console.log("We're online 2nd attempt?");
          this.initMap().then(() => {
              resolve(true);
            });
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;

    return new Promise((resolve) => {
 
      Geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.myLocation = latLng;

        let mapOptions = {
          center: latLng,
          zoom: 15,
          tilt: 30,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          backgroundColor: 'white',
 
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);

        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        
        this.directionsDisplay.setMap(this.map)

        //var transitLayer = new google.maps.TransitMode.BUS();
        //transitLayer.setMap(this.map);
        // this.map.addListener(google.maps.event.MAP_READY, function(){
        
        //       for(let res of this.markers){
        //         this.map.addMarker(res.stop_lat, res.stop_lon, res.stop_name);
        //       }        

        // })
        resolve(true);
 
      });
 
    });
 
  }
 


  showMarkers(dataArr:any){
      console.log(this.markers.length);

      if(this.markers.length > 0){
        for(let marker of this.markers){
          marker.setMap(null);
        }

        this.markers.length = 0;

      }

      for(let data of dataArr){
        //let tempLatLng = new GoogleMapsLatLng(data.stop_lat,data.stop_lon);
        this.addMarker(data.stop_lat,data.stop_lon,data.stop_name);   
      }
  }

  /*
  * function addMarkers 
  * 
  * Takes as input:
  * 1 - stop_lat_lng as a GoogleMapsLatLng object containing Latitude and Longitude values
  * 2- stop_name as String and is name of the road of which the bus stop is located on.
  *
  * This function creates a marker on to this.map object. Clicking the marker would open the markers
  * infoWindow, prompting the user to confirm their bus ride confirmation. Clicking the infoWindow 
  * would confirm the user to this bus stop and any bus that would eventually pass.
  */
  addMarker(laT: number, lnG: number, stop_name : string): void {
    //let latLng = new google.maps.LatLng(lat, lng);
    var image = 'http://www.stevestonmarine.com/image/cache/data/map-marker-13-32x32_0.png';
    var selectedMarker = 'https://www.londondrugs.com/on/demandware.static/Sites-LondonDrugs-Site/-/default/dw2a9afa9b/img/map_marker_default.png';

    let marker = new google.maps.Marker({
      map: this.map,
      position: {lat: laT, lng: lnG},
      icon: image
    });
    var contentStirng = "<h2>" + stop_name +"</h2>" 
                        //"<button onclick="+ this.selectedDest(marker.position); +">Click Me</button>"
                        

    var infowindow = new google.maps.InfoWindow({
          content: contentStirng
    });

    infowindow.addListener('click', () =>{

      console.log("clicked info");
      

    });
 
    marker.addListener('click', function(){
      marker.setIcon(selectedMarker);
      infowindow.open(this.map, marker);
    });

    marker.addListener('dblclick', () =>{
      //alert("Buses that come here: ..")
      this.selectedDest(marker.position);
    });

    this.markers.push(marker);  
 
  }

  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    document.addEventListener('online', () => {
 
      console.log("online");
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        } 
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
    }, false);
 
    document.addEventListener('offline', () => {
 
      console.log("offline");
 
      this.disableMap();
 
    }, false);
 
  }
  
  /*
  *
  * Calculate and displays route onto map.
  * Inaddtiion, options are defined here
  * 
  * Input: Destination's latitude and longitude
  *
  */
  calcRoute(lat: number, lng: number){

    var request = {
      origin: this.myLocation,
      destination: new google.maps.LatLng(lat, lng),
      travelMode: 'TRANSIT',
      transitOptions: {
        departureTime: new Date(Date.now()),
        modes: ['BUS'],
        routingPreference: 'FEWER_TRANSFERS'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    console.log("Request done");

    this.directionsService.route(request, (response, status) =>{
        console.log("in the direction service")
        if(status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else if(status == google.maps.DirectionsStatus.NOT_FOUND){
          console.log("Syntax err");
        } else if(status == google.maps.DirectionsStatus.ZERO_RESULTS){
          console.log("Nothing found");
        }
    })
  }


  selectedDest(dest: any){

      for(let marker of this.markers){

        if(dest == marker.position){
          //marker.setMap(null);
          var tempMark = marker;
          //this.markers.splice(index, 1);
        } else {
            marker.setMap(null);
        }
        
      }

      this.markers.length = 0;
      this.markers.push(tempMark);

      this.calcRoute(dest.lat(),dest.lng());

  }
 
}