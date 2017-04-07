
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
import { Injectable } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { Connectivity } from '../../providers/connectivity';

let fixture: ComponentFixture<MapPage> = null;
let instance: any = null;
let comp: MapPage;
let de: DebugElement;
let el: HTMLElement;

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
});
