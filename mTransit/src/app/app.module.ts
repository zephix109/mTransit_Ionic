import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SmsPage } from '../pages/sms/sms';
import { SmsCodePage } from '../pages/sms-code/sms-code';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { RatingPagePage } from '../pages/rating-page/rating-page';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Ionic2RatingModule } from 'ionic2-rating';
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
    SmsCodePage,
    DriverLoginPage,
    RatingPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
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
    SmsCodePage,
    DriverLoginPage,
    RatingPagePage
  ],
  providers: [{provide: ErrorHandler, useClass:IonicErrorHandler}]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n',
  '.json');
}
