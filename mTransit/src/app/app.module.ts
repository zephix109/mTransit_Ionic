import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import {SmsPage} from '../pages/sms/sms';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

import { provide } from 'angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';

let storage: Storage = new Storage();

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SmsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    SmsPage,
  ],
  providers: [{provide: ErrorHandler, useClass:IonicErrorHandler}]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n',
  '.json');
}
