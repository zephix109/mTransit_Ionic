import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NavController } from 'ionic-angular';

import {AuthService} from '../../services/auth/auth.service';

import {TestPage} from '../test/test';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class loginPage {

  constructor(public navCtrl: NavController, public translateService: TranslateService, public auth: AuthService) {}

  Login(){
    this.auth.login();

    this.navCtrl.push('test/test');

  }
  
  goToMap() {
	  this.navCtrl.push(MapPage);
  }

  swapLanguage() {
    if(this.translateService.currentLang == "en")
      this.translateService.use('fr');
    else
      this.translateService.use('en');
  }
}