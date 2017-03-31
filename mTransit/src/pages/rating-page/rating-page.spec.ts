import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { RatingPagePage } from './rating-page';

let fixture: ComponentFixture<RatingPagePage> = null;
let instance: any = null;

describe('Pages: RatingPagePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RatingPagePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

  })));

  it('should create the rating page', async(() => {
    expect(instance).not.toBeTruthy();
  }));
});
