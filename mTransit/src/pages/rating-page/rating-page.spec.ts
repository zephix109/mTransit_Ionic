import { TestUtils } from '../../test';
import { RatingPagePage } from './rating-page';
import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { NavMock } from '../../mocks';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';

let fixture: ComponentFixture<RatingPagePage> = null;
let instance: any = null;

describe('Pages: RatingPagePage', () => {

  let fixture: ComponentFixture<RatingPagePage> = null;
let instance: any = null;

let comp: RatingPagePage;

let de: DebugElement;
let el: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, RatingPagePage],

      providers: [
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: RatingPagePage,
          useClass: RatingPagePage
        }
      ],

      imports: [
        IonicModule.forRoot(MyApp),
        TranslateModule.forRoot()
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(RatingPagePage);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  xit('should create the rating page', async(() => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  }));
/*
  xit('should include the finishReview function', ()=> {
    expect(comp.finishReview());
  });
  xit('should have called finishReview function',  ()=> {
    spyOn(comp, 'finishReview');
    comp.finishReview();
    expect(comp).toBeDefined();
    expect(comp.finishReview).toHaveBeenCalled();
  });
*/

});
