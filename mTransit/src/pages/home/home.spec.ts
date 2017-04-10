import { TestUtils } from '../../test';
import { HomePage } from './home';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController, Nav } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NavMock } from '../../mocks';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { MapPage } from '../map/map';
import { SmsPage } from '../sms/sms';
import { RatingPagePage } from '../rating-page/rating-page';
import { DriverLoginPage } from '../driver-login/driver-login';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

let comp: HomePage;
let de: DebugElement;
let el: HTMLElement;
let comp2: HomePage = null;
let navCtrl: NavController;
let translateService: TranslateService;
describe('Page: Home Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, HomePage],

      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: HomePage,
          useClass: HomePage
        },
        { provide: NavController,
          useValue: {push: NavController.prototype.push}
        }
      ],


      imports: [
        IonicModule.forRoot(MyApp),
        TranslateModule.forRoot()
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomePage);
    comp    = fixture.componentInstance;
    comp2 = new HomePage(navCtrl, translateService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
    comp2 = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });
 
  it('should be able to launch Map Page', () => {
      inject([HomePage], (comp2) => {

       // Spies
      spyOn(comp2.navCtrl, 'push').and.stub();

      // Call
      comp2.goToMap();

     // Expectations
      expect(comp2.navCtrl.push).toHaveBeenCalledWith(MapPage);
  });

  it('should be able to launch Driver Login Page', () => {
      inject([HomePage], (comp2) => {

       // Spies
      spyOn(comp2.navCtrl, 'push').and.stub();

      // Call
      comp2.goToDriverLogin();

     // Expectations
      expect(comp2.navCtrl.push).toHaveBeenCalledWith(DriverLoginPage);
  });
  it('should include the goToRating function', () => {
    expect(comp.goToRating());
  });

  it('should include the swapLanguage function', ()=> {
    expect(comp.swapLanguage());
  });
  it('should be able to swap language', () => {

    let translateService = fixture.debugElement.injector.get(TranslateService);
    spyOn(translateService, 'use');
    //comp2.swapLanguage();
    de = fixture.debugElement.query(By.css('#language'));

    de.triggerEventHandler('click', null);

    expect(translateService.use).toHaveBeenCalled();

  });
  it('should have current language as english', () => {

    let translateService = fixture.debugElement.injector.get(TranslateService);
    //spyOn(translateService, 'use');
    //comp2.swapLanguage();
    de = fixture.debugElement.query(By.css('#language'));

    de.triggerEventHandler('click', null);

    expect(translateService.currentLang).toBe('en');

  });

  it('should include facebookLogin function', ()=> {
    expect(comp.facebookLogin());
  });

})});