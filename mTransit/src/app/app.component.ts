import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, translate: TranslateService) {
    translate.setDefaultLang('en');
    const firebaseConfig = {
      apiKey: "AIzaSyClOWx3rRxBGM1yshjpC-brIQfoyMG4k0M",
      authDomain: "mtransit-5edbf.firebaseapp.com",
      databaseURL: "https://mtransit-5edbf.firebaseio.com",
      storageBucket: "mtransit-5edbf.appspot.com",
      messagingSenderId: "883599256403"
    };

    firebase.initializeApp(firebaseConfig);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
    });
  }

}


