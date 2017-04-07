
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
    expect(comp.loadMap());
  });
  it('should have called loadMap function',  ()=> {
    spyOn(comp, 'loadMap');
    comp.loadMap();
    expect(comp.loadMap).toHaveBeenCalled();
  });

  it('should include the goToRating function', () => {
    expect(comp.goToRating());
  });
    it('should have called goToRating function',  ()=> {
    spyOn(comp, 'goToRating');
    comp.goToRating();
    expect(comp.goToRating).toHaveBeenCalled();
  });
});
