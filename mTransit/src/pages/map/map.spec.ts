
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
declare var google; 

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


});
