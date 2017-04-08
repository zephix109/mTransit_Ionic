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


describe('Providers: bus-stop-service', () => {

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
  it('should allow maps to have load_Near_User function', () => {
    expect(comp.busStopService.load_Near_User());
  });
  it('should have called google maps load_Near_User function',  ()=> {
    spyOn(comp.busStopService, 'load_Near_User');
    comp.busStopService.load_Near_User();
    expect(comp.busStopService).toBeDefined();
    expect(comp.busStopService.load_Near_User).toHaveBeenCalled();
  });
  it('should allow maps to have load_Destination function', () => {
    expect(comp.busStopService.load_Destination(lat, lon));
  });
  it('should have called google maps load_Destination function',  ()=> {
    spyOn(comp.busStopService, 'load_Destination');
    comp.busStopService.load_Destination(lat, lon);
    expect(comp.busStopService).toBeDefined();
    expect(comp.busStopService.load_Destination).toHaveBeenCalled();
  });
  it('should allow maps to have applyHaversine function', () => {
    expect(comp.busStopService.applyHaversine(busStopJSONarr, user_lat, user_lon));
  });
  it('should have called google maps applyHaversine function',  ()=> {
    spyOn(comp.busStopService, 'applyHaversine');
    comp.busStopService.applyHaversine(busStopJSONarr, user_lat, user_lon);
    expect(comp.busStopService).toBeDefined();
    expect(comp.busStopService.applyHaversine).toHaveBeenCalled();
  });
  it('should allow maps to have getDistanceBetweenPoints function', () => {
    expect(comp.busStopService.getDistanceBetweenPoints(start, end, units));
  });
  it('should have called google maps getDistanceBetweenPoints function',  ()=> {
    spyOn(comp.busStopService, 'getDistanceBetweenPoints');
    comp.busStopService.getDistanceBetweenPoints(start, end, units);
    expect(comp.busStopService).toBeDefined();
    expect(comp.busStopService.getDistanceBetweenPoints).toHaveBeenCalled();
  });
  it('should allow maps to have toRad function', () => {
    expect(comp.busStopService.toRad(x));
  });
  it('should have called google maps toRad function',  ()=> {
    spyOn(comp.busStopService, 'toRad');
    comp.busStopService.toRad(x);
    expect(comp.busStopService).toBeDefined();
    expect(comp.busStopService.toRad).toHaveBeenCalled();
  });
});