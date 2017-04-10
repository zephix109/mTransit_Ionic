import { Injectable, NgZone } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation, GoogleMapsLatLng, Geoposition } from 'ionic-native';
 
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
  watch: any;
  selectedPath: boolean;

  directionArr: any[] =[];

  polylines = [];

  constructor(public connectivityService: Connectivity, zone:NgZone) {}
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
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

  goToPlace(place){
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29)
        });
          infowindow.close();
          marker.setVisible(false);

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
          } else {
            this.map.setCenter(place.geometry.location);
          }

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
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
          disableDefaultUI: true,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],

        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
 
      });
 
    });
 
  }

  showMarkers(dataArr:any){
      console.log(this.markers.length);

      if(this.markers.length > 0){
        this.clearMarkers();
      }

      for(let data of dataArr){
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
    var image = 'https://www.givepulse.com/images/search/blueMarker.png';
    var selectedMarker = 'http://i.imgur.com/sCGNAdB.png';

    let marker = new google.maps.Marker({
      map: this.map,
      position: {lat: laT, lng: lnG},
      icon: image
    });                
    
    var contentString =  "<p>" + stop_name + "</p>" +
                        "<button ng-click='clickR()'>Click me</button>"                       

    var infowindow = new google.maps.InfoWindow({
          content: contentString
    });

    infowindow.addListener('click', () =>{

      console.log("clicked info");
      

    });

    marker.addListener('click', () => {
    marker.setIcon(selectedMarker);
    infowindow.open(this.map, marker);

    this.calcRoute(marker.position.lat(), marker.position.lng());
  });

    marker.addListener('rightclick', () =>{
      marker.setIcon(selectedMarker);
      this.clearDisplayedPaths();
      this.selectedPath = true;
      this.selectedDest(marker.position);

      this.watch = Geolocation.watchPosition().subscribe((position: Geoposition) => {

        let tempMarker = new google.maps.Marker({
          map: this.map,
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
          icon: image
        });    

        this.markers.push(tempMarker);
      });
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
 
      if(typeof google == "undefined" || typeof google.maps == "undefined") {
        this.loadGoogleMaps();
      } else {
        if(!this.mapInitialised) {
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

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
      origin: this.myLocation,
      destination: new google.maps.LatLng(lat, lng),
      travelMode: 'DRIVING',
      provideRouteAlternatives: false,
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    console.log("Request done");

    directionsService.route(request, (response, status) =>{
        console.log(status);
        if(status == google.maps.DirectionsStatus.OK) {
          
          this.renderDirectionsPolylines(response);
          this.directionArr.push(directionsDisplay);

        } else if(status == google.maps.DirectionsStatus.NOT_FOUND){
          console.log("Syntax err");
        } else if(status == google.maps.DirectionsStatus.ZERO_RESULTS){
          console.log("Nothing found");
        }
    })
  }
  

  renderDirectionsPolylines(response) {

    let polylineOptions = {
      strokeColor: '#ffffff',
      strokeOpacity: 10,
      strokeWeight: 7
    };

    var legs = response.routes[0].legs;
    for (var i = 0; i < legs.length; i++) {
      var steps = legs[i].steps;
      for (var j = 0; j < steps.length; j++) {
        var nextSegment = steps[j].path;
        var stepPolyline = new google.maps.Polyline(polylineOptions);
        for (var k = 0; k < nextSegment.length; k++) {
          stepPolyline.getPath().push(nextSegment[k]);
        }
        this.polylines.push(stepPolyline);
        if(this.selectedPath){
          stepPolyline.setOptions({
              strokeColor: 'blue'
          });
        }
        stepPolyline.setMap(this.map);
        // route click listeners, different one on each step
        google.maps.event.addListener(stepPolyline, 'click', function(evt) {
          console.log("clicked");
        })
      }
    }
  }

  selectedDest(dest: any){

      for(let marker of this.markers){

        if(dest == marker.position){
          var tempMark = marker;
        } else {
          marker.setMap(null);
        }
      }

      this.markers.length = 0;
      this.markers.push(tempMark);

      this.calcRoute(dest.lat(),dest.lng());

  }

  clearDisplayedPaths(){
      for(let path of this.directionArr){
        path.setMap(null);
      }

      for(let path of this.polylines){
        path.setMap(null);
      }
  }

  clearMarkers(){

    for(let marker of this.markers){
      marker.setMap(null);
    }
    this.markers.length = 0;   
  }
}
