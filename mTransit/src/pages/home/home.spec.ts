
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
import { tick, fakeAsync } from '@angular/core/testing';


let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

let comp: HomePage;

let de: DebugElement;
let el: HTMLElement;

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

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });
  it('should include the swapLanguage function', ()=> {
    expect(comp.swapLanguage());
  });
  it('should have called swapLanguage function',  ()=> {
    spyOn(comp, 'swapLanguage');
    comp.swapLanguage();
    expect(comp.swapLanguage).toHaveBeenCalled();
  });
  it('should change language to French', ()=> {
    comp.swapLanguage();
    if(comp.translateService.currentLang == "en")
      expect(comp.translateService.use('fr'));
  });
  it('should change language to English', ()=> {
    comp.swapLanguage();
    if(comp.translateService.currentLang == "fr")
      expect(comp.translateService.use('en'));
  });
  it('should include facebookLogin function', ()=> {
    expect(comp.facebookLogin());
  });
  it('should have called facebookLogin function', ()=> {
    spyOn(comp,'facebookLogin');
    comp.
    expect(comp.facebookLogin).toHaveBeenCalled();
  });

});
