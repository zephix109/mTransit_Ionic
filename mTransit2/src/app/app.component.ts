import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { loginPage } from '../pages/login/login';
import { TranslateService } from './translate';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
})
export class MyApp implements OnInit{
  rootPage = loginPage;

  public translatedText: string;
  public supportedLanguages: any[];

  constructor(platform: Platform, private _translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {

    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'French', value: 'fr' },
    ];

    //set current language
    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    //check if selected language is current language
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    //set current language;
    this._translate.use(lang);
    this.refreshText();
  }

  refreshText() {
    //refresh translation when language changes
    this.translatedText = this._translate.instant('hello world'); // **will change from hello world**
  }
}
