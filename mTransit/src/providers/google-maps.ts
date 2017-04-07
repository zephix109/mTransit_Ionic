import { Injectable, NgZone } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation, GoogleMapsLatLng, Geoposition } from 'ionic-native';
 
declare const google;
 
@Injectable()
export class GoogleMaps {
 
  public mapElement: any;
  public pleaseConnect: any;
  public map: any;
  public mapInitialised: boolean = false;
  public mapLoaded: any;
  public mapLoadedObserver: any;
  public markers: any[] = [];
  public apiKey: string;//"AIzaSyApveMIrtj5hoxWezmwCNbGLjKwhxsd3W0";
  public myLocation: any;
  public watch: any;
  public selectedPath: boolean;
  public directionArr: any[] =[];
  public polylines = [];

  constructor(public connectivityService: Connectivity, zone:NgZone) {}
 
  public init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }
 
  public loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      const mapInit = 'mapInit';
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        this.disableMap();
        if (this.connectivityService.isOnline()) {
          window[mapInit] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          };
 
          const script = document.createElement("script");
          script.id = "googleMaps";
 
          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
 
          document.body.appendChild(script);  
        } 
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap().then(() => {
              resolve(true);
            });
          this.enableMap();
        } else {
          this.disableMap();
        }
      }
 
      this.addConnectivityListeners();
    });
  }
 
  public initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition().then((position) => {
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.myLocation = latLng;

        const mapOptions = {
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
        };
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      });
    });
  }
 
  public loadSearchBar(input: any){
    const searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        
        this.clearMarkers();

        const bounds =  new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
              return;
            }
            const icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            this.markers.push(new google.maps.Marker({
              map: this.map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
        });
      });
  }

  public showMarkers(dataArr:any){
      if(this.markers.length > 0){
        this.clearMarkers();
      }

      for(const data of dataArr){
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
  public addMarker(laT: number, lnG: number, stop_name : string): void {
    const image = 'https://www.givepulse.com/images/search/blueMarker.png';
    const selectedMarker = 'https://www.londondrugs.com/on/demandware.static/Sites-LondonDrugs-Site/-/default/dw2a9afa9b/img/map_marker_default.png';
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: laT, lng: lnG},
      icon: image
    });                
    
    const contentString =  "<p>" + stop_name + "</p>" +
                        "<button ng-click='clickR()'>Click me</button>";                       

    const infowindow = new google.maps.InfoWindow({
          content: contentString
    });

    infowindow.addListener('click', () =>{ });
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
        const tempMarker = new google.maps.Marker({
          map: this.map,
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
          icon: image
        });    

        this.markers.push(tempMarker);
      });
    });

    this.markers.push(marker);  
  }
 
  public disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }
 
  public enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }
 
  public addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
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
  public calcRoute(lat: number, lng: number){
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const request = {
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

    directionsService.route(request, (response, status) =>{
        if(status == google.maps.DirectionsStatus.OK) {
          this.renderDirectionsPolylines(response);
          this.directionArr.push(directionsDisplay);
        }
    });
  }
  

  public renderDirectionsPolylines(response) {
    const polylineOptions = {
      strokeColor: '#000000',
      strokeOpacity: 10,
      strokeWeight: 7
    };

    const legs = response.routes[0].legs;
    for (const i of legs) {
      const steps = legs[i].steps;
      for (const j of steps) {
        const nextSegment = steps[j].path;
        const stepPolyline = new google.maps.Polyline(polylineOptions);
        for (const k of nextSegment) {
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
        google.maps.event.addListener(stepPolyline, 'click', (evt) => {
        });
      }
    }
  }

  public selectedDest(dest: any){
    let tempMark;
    for(const marker of this.markers){
      if(dest == marker.position){
        tempMark = marker;
      } else {
        marker.setMap(null);
      }
    }

    this.markers.length = 0;
    this.markers.push(tempMark);
    this.calcRoute(dest.lat(),dest.lng());
  }

  public clearDisplayedPaths(){
      for(const path of this.directionArr){
        path.setMap(null);
      }

      for(const path of this.polylines){
        path.setMap(null);
      }
  }

  public clearMarkers(){
    for(const marker of this.markers){
      marker.setMap(null);
    }
    this.markers.length = 0;   
  }
}
