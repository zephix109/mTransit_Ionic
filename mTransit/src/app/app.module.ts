import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SmsPage } from '../pages/sms/sms';
import { DriverLoginPage } from '../pages/driver-login/driver-login';
import { RatingPagePage } from '../pages/rating-page/rating-page';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Ionic2RatingModule } from 'ionic2-rating';
import { provide } from 'angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { BusStopService } from '../providers/bus-stop-service';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { Formulas } from '../providers/formulas';
import { StatusBar, Splashscreen } from 'ionic-native';

import firebase from 'firebase';

//let storage: Storage = new Storage();

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SmsPage,
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
    DriverLoginPage,
    RatingPagePage
  ],

  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},StatusBar, Splashscreen,
    BusStopService, GoogleMaps, Connectivity, Formulas],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n',
  '.json');
}
