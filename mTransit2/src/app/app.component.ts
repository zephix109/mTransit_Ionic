import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
import { loginPage } from '../pages/login/login';
// Translate setup guide: https://javebratt.com/angular-translate-ionic/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = loginPage;

  constructor(platform: Platform, translate: TranslateService) {
    translate.setDefaultLang('en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
