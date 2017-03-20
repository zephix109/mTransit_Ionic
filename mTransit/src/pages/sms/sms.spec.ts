import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SmsPage }          from './sms';

let fixture: ComponentFixture<SmsPage> = null;
let instance: any = null;

describe('Pages: Sms', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([SmsPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

  })));

  xit('should create the sms page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
