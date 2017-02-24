import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { loginPage } from '../pages/login/login';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    MyApp,
    loginPage
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
    loginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}