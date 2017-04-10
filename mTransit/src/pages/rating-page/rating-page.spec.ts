import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { RatingPagePage } from './rating-page';
import { Ionic2RatingModule } from 'ionic2-rating';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let fixture: ComponentFixture<RatingPagePage> = null;
let instance: any = null;

describe('Pages: RatingPagePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RatingPagePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

  })));

  xit('should create the rating page', async(() => {
    expect(instance).not.toBeTruthy();
  }));
});
