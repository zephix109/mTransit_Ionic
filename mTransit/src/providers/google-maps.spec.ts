import { TestUtils } from '../test';
import { MapPage } from '../pages/map/map';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { NavMock } from '../mocks';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { GoogleMaps } from './google-maps';
import { Injectable, NgZone } from '@angular/core';
import { BusStopService } from './bus-stop-service';
import { Connectivity } from './connectivity';
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
let maps2: GoogleMaps = null;
describe('Providers: google-maps', () => {

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
    maps2 = new GoogleMaps(connectivity, zone);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
    maps2 = null;
  });
  
  it('should allow maps to have init function', () => {
    expect(maps2.init(mapElement, pleaseConnect));
  });
  it('should return a promise',  ()=> {
    expect(typeof maps2.init(mapElement, pleaseConnect)).toBe('Promise<any>');
  });
  it('should have called google maps init function',  ()=> {
    spyOn(maps2, 'init');
    maps2.init(mapElement, pleaseConnect);
    expect(maps2).toBeDefined();
    expect(maps2.init).toHaveBeenCalled();
  });
  it('should allow maps to have loadGoogleMaps function', () => {
    expect(maps2.loadGoogleMaps());
  });
  it('should return a promise',  ()=> {
    expect(typeof maps2.loadGoogleMaps()).toBe('Promise<any>');
  });
  it('should have called google maps loadGoogleMaps function',  ()=> {
    spyOn(maps2, 'loadGoogleMaps');
    maps2.loadGoogleMaps();
    expect(maps2).toBeDefined();
    expect(maps2.loadGoogleMaps).toHaveBeenCalled();
  });
  it('should allow maps to have initMap function', () => {
    expect(maps2.initMap());
  });
  it('should have called google maps initMap function',  ()=> {
    spyOn(maps2, 'initMap');
    maps2.initMap();
    expect(maps2).toBeDefined();
    expect(maps2.initMap).toHaveBeenCalled();
  });
  it('should allow maps to have loadSearchBar function', () => {
    expect(maps2.loadSearchBar(input));
  });
  it('should have called google maps loadSearchBar function',  ()=> {
    spyOn(maps2, 'loadSearchBar');
    maps2.loadSearchBar(input);
    expect(maps2).toBeDefined();
    expect(maps2.loadSearchBar).toHaveBeenCalled();
  });
  it('should allow maps to have showMarkers function', () => {
    expect(maps2.showMarkers(dataArr));
  });
  it('should have called google maps showMarkers function',  ()=> {
    spyOn(maps2, 'showMarkers');
    maps2.showMarkers(dataArr);
    expect(maps2).toBeDefined();
    expect(maps2.showMarkers).toHaveBeenCalled();
  });
  it('should allow maps to have showMarkers function', () => {
    expect(maps2.showMarkers(dataArr));
  });
  it('should have called google maps showMarkers function',  ()=> {
    spyOn(maps2, 'showMarkers');
    maps2.showMarkers(dataArr);
    expect(maps2).toBeDefined();
    expect(maps2.showMarkers).toHaveBeenCalled();
  });
  it('should allow maps to have addMarker function', () => {
    expect(maps2.addMarker(lat, lon, stopName));
  });
  it('should have called google maps addMarker function',  ()=> {
    spyOn(maps2, 'addMarker');
    maps2.addMarker(lat, lon, stopName);
    expect(maps2).toBeDefined();
    expect(maps2.addMarker).toHaveBeenCalled();
  });
  it('should allow maps to have disableMap function', () => {
    expect(maps2.disableMap());
  });
  it('should have called google maps disableMap function',  ()=> {
    spyOn(maps2, 'disableMap');
    maps2.disableMap();
    expect(maps2).toBeDefined();
    expect(maps2.disableMap).toHaveBeenCalled();
  });
  it('should allow maps to have enableMap function', () => {
    expect(maps2.enableMap());
  });
  it('should have called google maps enableMap function',  ()=> {
    spyOn(maps2, 'enableMap');
    maps2.enableMap();
    expect(maps2).toBeDefined();
    expect(maps2.enableMap).toHaveBeenCalled();
  });
  it('should allow maps to have addConnectivityListeners function', () => {
    expect(maps2.addConnectivityListeners());
  });
  it('should have called google maps addConnectivityListeners function',  ()=> {
    spyOn(maps2, 'addConnectivityListeners');
    maps2.addConnectivityListeners();
    expect(maps2).toBeDefined();
    expect(maps2.addConnectivityListeners).toHaveBeenCalled();
  });
  it('should allow maps to have calcRoute function', () => {
    expect(maps2.calcRoute(lat,lon));
  });
  it('should have called google maps calcRoute function',  ()=> {
    spyOn(maps2, 'calcRoute');
    maps2.calcRoute(lat, lon);
    expect(maps2).toBeDefined();
    expect(maps2.calcRoute).toHaveBeenCalled();
  });
  it('should allow maps to have renderDirectionsPolylines function', () => {
    expect(maps2.renderDirectionsPolylines(response));
  });
  it('should have called google maps renderDirectionsPolylines function',  ()=> {
    spyOn(maps2, 'renderDirectionsPolylines');
    maps2.renderDirectionsPolylines(response);
    expect(maps2).toBeDefined();
    expect(maps2.renderDirectionsPolylines).toHaveBeenCalled();
  });
  it('should allow maps to have selectedDest function', () => {
    expect(maps2.selectedDest(destination));
  });
  it('should have called google maps selectedDest function',  ()=> {
    spyOn(maps2, 'selectedDest');
    maps2.selectedDest(destination);
    expect(maps2).toBeDefined();
    expect(maps2.selectedDest).toHaveBeenCalled();
  });
  it('should allow maps to have clearDisplayedPaths function', () => {
    expect(maps2.clearDisplayedPaths());
  });
  it('should have called google maps clearDisplayedPaths function',  ()=> {
    spyOn(maps2, 'clearDisplayedPaths');
    maps2.clearDisplayedPaths();
    expect(maps2).toBeDefined();
    expect(maps2.clearDisplayedPaths).toHaveBeenCalled();
  });
  it('should allow maps to have clearMarkers function', () => {
    expect(maps2.clearMarkers());
  });
  it('should have called google maps clearMarkers function',  ()=> {
    spyOn(maps2, 'clearMarkers');
    maps2.clearMarkers();
    expect(maps2).toBeDefined();
    expect(maps2.clearMarkers).toHaveBeenCalled();
  });
  });