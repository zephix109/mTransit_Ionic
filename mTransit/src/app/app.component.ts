import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { RatingPagePage } from '../pages/rating-page/rating-page';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 

  rootPage : any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, translate: TranslateService, public statusBar: StatusBar, public splashScreen: Splashscreen) {
    translate.setDefaultLang('en');
    
    const firebaseConfig = {
      apiKey: "AIzaSyClOWx3rRxBGM1yshjpC-brIQfoyMG4k0M",
      authDomain: "mtransit-5edbf.firebaseapp.com",
      databaseURL: "https://mtransit-5edbf.firebaseio.com",
      storageBucket: "mtransit-5edbf.appspot.com",
      messagingSenderId: "883599256403"
    };

    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Map Page', component: MapPage },
      { title: 'Rating Page', component: RatingPagePage }
    ];

    firebase.initializeApp(firebaseConfig);

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}


