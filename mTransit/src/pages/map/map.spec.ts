
import { TestUtils } from '../../test';
import { MapPage } from './map';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NavMock } from '../../mocks';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { GoogleMaps } from '../../providers/google-maps';
import { Injectable, NgZone } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { Connectivity } from '../../providers/connectivity';
import { Network } from 'ionic-native';

let fixture: ComponentFixture<MapPage> = null;
let instance: any = null;
let comp: MapPage;
let de: DebugElement;
let el: HTMLElement;
let connectivityService: Connectivity;
let zone: NgZone;
let maps: GoogleMaps;
let mapElement: any;
let pleaseConnect: any;
let input: any;
let dataArr: any;
let lat: number;
let lon: number;
let stopName: string;
let response: any;
let destination: any;
let polylines = [];
declare var google; 
let busStopService: BusStopService;
let user_lat : number;
let user_lon : number;
let busStopJSONarr: any;
let start: any;
let end: any;
let units: any;
let x: any;
let Connection: any;
let connectivity: Connectivity;

describe('Pages: Map', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, MapPage],

      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: MapPage,
          useClass: MapPage
        },
        {
          provide: GoogleMaps,
          useClass: GoogleMaps
        },
        {
          provide: BusStopService,
          useClass: BusStopService
        },
        {
          provide: Connectivity,
          useClass: Connectivity
        }
        
      ],

      imports: [
        IonicModule.forRoot(MyApp),
        TranslateModule.forRoot()
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(MapPage);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('should create the map page', async(() => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  }));

  it('should include the loadMap function', () => {
    expect(comp.ionViewDidLoad());
  });
  it('should have called loadMap function',  ()=> {
    spyOn(comp, 'ionViewDidLoad');
    comp.ionViewDidLoad();
    expect(comp).toBeDefined();
    expect(comp.ionViewDidLoad).toHaveBeenCalled();
  });

  it('should include the goToRating function', () => {
    expect(comp.goToRating());
  });
    it('should have called goToRating function',  ()=> {
    spyOn(comp, 'goToRating');
    comp.goToRating();
    expect(comp).toBeDefined();
    expect(comp.goToRating).toHaveBeenCalled();
  });
  it('should allow maps to have init function', () => {
    expect(comp.maps.init(mapElement, pleaseConnect));
  });

  it('should have called google maps init function',  ()=> {
    spyOn(comp.maps, 'init');
    comp.maps.init(mapElement, pleaseConnect);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.init).toHaveBeenCalled();
  });
  it('should allow maps to have loadGoogleMaps function', () => {
    expect(comp.maps.loadGoogleMaps());
  });
  it('should have called google maps loadGoogleMaps function',  ()=> {
    spyOn(comp.maps, 'loadGoogleMaps');
    comp.maps.loadGoogleMaps();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.loadGoogleMaps).toHaveBeenCalled();
  });
  it('should allow maps to have initMap function', () => {
    expect(comp.maps.initMap());
  });
  it('should have called google maps initMap function',  ()=> {
    spyOn(comp.maps, 'initMap');
    comp.maps.initMap();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.initMap).toHaveBeenCalled();
  });
  it('should allow maps to have loadSearchBar function', () => {
    expect(comp.maps.loadSearchBar(input));
  });
  it('should have called google maps loadSearchBar function',  ()=> {
    spyOn(comp.maps, 'loadSearchBar');
    comp.maps.loadSearchBar(input);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.loadSearchBar).toHaveBeenCalled();
  });
  it('should allow maps to have showMarkers function', () => {
    expect(comp.maps.showMarkers(dataArr));
  });
  it('should have called google maps showMarkers function',  ()=> {
    spyOn(comp.maps, 'showMarkers');
    comp.maps.showMarkers(dataArr);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.showMarkers).toHaveBeenCalled();
  });
  it('should allow maps to have showMarkers function', () => {
    expect(comp.maps.showMarkers(dataArr));
  });
  it('should have called google maps showMarkers function',  ()=> {
    spyOn(comp.maps, 'showMarkers');
    comp.maps.showMarkers(dataArr);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.showMarkers).toHaveBeenCalled();
  });
  it('should allow maps to have addMarker function', () => {
    expect(comp.maps.addMarker(lat, lon, stopName));
  });
  it('should have called google maps addMarker function',  ()=> {
    spyOn(comp.maps, 'addMarker');
    comp.maps.addMarker(lat, lon, stopName);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.addMarker).toHaveBeenCalled();
  });
  it('should allow maps to have disableMap function', () => {
    expect(comp.maps.disableMap());
  });
  it('should have called google maps disableMap function',  ()=> {
    spyOn(comp.maps, 'disableMap');
    comp.maps.disableMap();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.disableMap).toHaveBeenCalled();
  });
  it('should allow maps to have enableMap function', () => {
    expect(comp.maps.enableMap());
  });
  it('should have called google maps enableMap function',  ()=> {
    spyOn(comp.maps, 'enableMap');
    comp.maps.enableMap();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.enableMap).toHaveBeenCalled();
  });
  it('should allow maps to have addConnectivityListeners function', () => {
    expect(comp.maps.addConnectivityListeners());
  });
  it('should have called google maps addConnectivityListeners function',  ()=> {
    spyOn(comp.maps, 'addConnectivityListeners');
    comp.maps.addConnectivityListeners();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.addConnectivityListeners).toHaveBeenCalled();
  });
  it('should allow maps to have calcRoute function', () => {
    expect(comp.maps.calcRoute(lat,lon));
  });
  it('should have called google maps calcRoute function',  ()=> {
    spyOn(comp.maps, 'calcRoute');
    comp.maps.calcRoute(lat, lon);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.calcRoute).toHaveBeenCalled();
  });
  it('should allow maps to have renderDirectionsPolylines function', () => {
    expect(comp.maps.renderDirectionsPolylines(response));
  });
  it('should have called google maps renderDirectionsPolylines function',  ()=> {
    spyOn(comp.maps, 'renderDirectionsPolylines');
    comp.maps.renderDirectionsPolylines(response);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.renderDirectionsPolylines).toHaveBeenCalled();
  });
  it('should allow maps to have selectedDest function', () => {
    expect(comp.maps.selectedDest(destination));
  });
  it('should have called google maps selectedDest function',  ()=> {
    spyOn(comp.maps, 'selectedDest');
    comp.maps.selectedDest(destination);
    expect(comp.maps).toBeDefined();
    expect(comp.maps.selectedDest).toHaveBeenCalled();
  });
  it('should allow maps to have clearDisplayedPaths function', () => {
    expect(comp.maps.clearDisplayedPaths());
  });
  it('should have called google maps clearDisplayedPaths function',  ()=> {
    spyOn(comp.maps, 'clearDisplayedPaths');
    comp.maps.clearDisplayedPaths();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.clearDisplayedPaths).toHaveBeenCalled();
  });
  it('should allow maps to have clearMarkers function', () => {
    expect(comp.maps.clearMarkers());
  });
  it('should have called google maps clearMarkers function',  ()=> {
    spyOn(comp.maps, 'clearMarkers');
    comp.maps.clearMarkers();
    expect(comp.maps).toBeDefined();
    expect(comp.maps.clearMarkers).toHaveBeenCalled();
  });
  it('should allow maps to have load_Near_User function', () => {
    expect(comp.bus_stop_service.load_Near_User());
  });
  it('should have called google maps load_Near_User function',  ()=> {
    spyOn(comp.bus_stop_service, 'load_Near_User');
    comp.bus_stop_service.load_Near_User();
    expect(comp.bus_stop_service).toBeDefined();
    expect(comp.bus_stop_service.load_Near_User).toHaveBeenCalled();
  });
  it('should allow maps to have load_Destination function', () => {
    expect(comp.bus_stop_service.load_Destination(lat, lon));
  });
  it('should have called google maps load_Destination function',  ()=> {
    spyOn(comp.bus_stop_service, 'load_Destination');
    comp.bus_stop_service.load_Destination(lat, lon);
    expect(comp.bus_stop_service).toBeDefined();
    expect(comp.bus_stop_service.load_Destination).toHaveBeenCalled();
  });
  it('should allow maps to have applyHaversine function', () => {
    expect(comp.bus_stop_service.applyHaversine(busStopJSONarr, user_lat, user_lon));
  });
  it('should have called google maps applyHaversine function',  ()=> {
    spyOn(comp.bus_stop_service, 'applyHaversine');
    comp.bus_stop_service.applyHaversine(busStopJSONarr, user_lat, user_lon);
    expect(comp.bus_stop_service).toBeDefined();
    expect(comp.bus_stop_service.applyHaversine).toHaveBeenCalled();
  });
  it('should allow maps to have getDistanceBetweenPoints function', () => {
    expect(comp.bus_stop_service.getDistanceBetweenPoints(start, end, units));
  });
  it('should have called google maps getDistanceBetweenPoints function',  ()=> {
    spyOn(comp.bus_stop_service, 'getDistanceBetweenPoints');
    comp.bus_stop_service.getDistanceBetweenPoints(start, end, units);
    expect(comp.bus_stop_service).toBeDefined();
    expect(comp.bus_stop_service.getDistanceBetweenPoints).toHaveBeenCalled();
  });
  it('should allow maps to have toRad function', () => {
    expect(comp.bus_stop_service.toRad(x));
  });
  it('should have called google maps toRad function',  ()=> {
    spyOn(comp.bus_stop_service, 'toRad');
    comp.bus_stop_service.toRad(x);
    expect(comp.bus_stop_service).toBeDefined();
    expect(comp.bus_stop_service.toRad).toHaveBeenCalled();
  });
  it('should allow maps to have isOnline function', () => {
    expect(Connection.isOnline());
  });
  it('should have called google maps isOnline function',  ()=> {
    spyOn(Connection, 'isOnline');
    Connection.isOnline();
    expect(Connection).toBeDefined();
    expect(Connection.isOnline).toHaveBeenCalled();
  });
  it('should allow maps to have isOffline function', () => {
    expect(Connection.isOffline());
  });
  it('should have called google maps isOffline function',  ()=> {
    spyOn(Connection, 'isOffline');
    Connection.isOffline();
    expect(Connection).toBeDefined();
    expect(Connection.isOffline).toHaveBeenCalled();
  });

});
