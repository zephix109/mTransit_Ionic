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

describe('Providers: connectivity', () => {

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