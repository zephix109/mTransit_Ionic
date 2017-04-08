
import { TestUtils } from '../../test';
import { HomePage } from './home';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NavMock } from '../../mocks';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';
import { MapPage } from '../map/map';
import { SmsPage } from '../sms/sms';
import { RatingPagePage } from '../rating-page/rating-page';
import { DriverLoginPage } from '../driver-login/driver-login';

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
  it('should include the goToMap function', ()=> {
    expect(comp.goToMap());
  });
  it('should have called goToMap function',  ()=> {
    spyOn(comp2, 'goToMap');
    comp2.goToMap();
    expect(comp2).toBeDefined();
    expect(comp2.goToMap).toHaveBeenCalled();
  });
  it('should include the goToSMS function', ()=> {
    expect(comp.goToSMS());
  });
  it('should have called goToSMS function',  ()=> {
    spyOn(comp2, 'goToSMS');
    comp2.goToSMS();
    expect(comp2).toBeDefined();
    expect(comp2.goToSMS).toHaveBeenCalled();
  });
  it('should include the goToDriverLogin function', ()=> {
    expect(comp.goToDriverLogin());
  });
  it('should have called goToDriverLogin function',  ()=> {
    spyOn(comp2, 'goToDriverLogin');
    comp2.goToDriverLogin();
    expect(comp2).toBeDefined();
    expect(comp2.goToDriverLogin).toHaveBeenCalled();
  });
  it('should include the goToRating function', () => {
    expect(comp.goToRating());
  });
    it('should have called goToRating function',  ()=> {
    spyOn(comp2, 'goToRating');
    comp2.goToRating();
    expect(comp2).toBeDefined();
    expect(comp2.goToRating).toHaveBeenCalled();
  });
  it('should include the swapLanguage function', ()=> {
    expect(comp.swapLanguage());
  });
  it('should have called swapLanguage function',  ()=> {
    spyOn(comp2, 'swapLanguage');
    comp2.swapLanguage();
    expect(comp2).toBeDefined();
    expect(comp2.swapLanguage).toHaveBeenCalled();
  });
  it('should change language to French', ()=> {
    comp2.swapLanguage();
    expect(comp2).toBeDefined();
    if(comp2.translateService.currentLang == "en")
      expect(comp2.translateService.use('fr'));
  });
  it('should change language to English', ()=> {
    comp2.swapLanguage();
    expect(comp2).toBeDefined();
    if(comp2.translateService.currentLang == "fr")
      expect(comp2.translateService.use('en'));
  });
  it('should include facebookLogin function', ()=> {
    expect(comp.facebookLogin());
  });
  it('should have called facebookLogin function', ()=> {
    spyOn(comp2,'facebookLogin');
    comp2.facebookLogin();
    expect(comp2).toBeDefined();
    expect(comp2.facebookLogin).toHaveBeenCalled();
  });

});
