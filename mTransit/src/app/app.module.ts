import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { SMSregPage } from '../pages/sm-sreg/sm-sreg';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

import { provide } from 'angular/core';
import { Auth} from "../providers/auth/auth";
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from '../services/auth/auth.service';
import { StopInit } from '../services/map/stops_Init';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    SMSregPage
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
    SMSregPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n',
  '.json');
}
