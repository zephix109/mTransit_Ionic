import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  constructor(public navCtrl: NavController, public translateService: TranslateService) {

  }

  swapLanguage() {
    if(this.translateService.currentLang == "en")
      this.translateService.use('fr');
    else
      this.translateService.use('en');
  }
}