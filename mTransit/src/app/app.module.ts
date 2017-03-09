import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import {SmsPage} from '../pages/sms/sms';

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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    SmsPage,
  ],
  
})
export class AppModule {}
