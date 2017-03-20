import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { MapPage }          from './map';

let fixture: ComponentFixture<MapPage> = null;
let instance: any = null;

describe('Pages: Map', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([MapPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;

  })));

  it('should create the map page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
