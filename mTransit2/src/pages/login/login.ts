import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {AuthService} from '../../services/auth/auth.service';

import {TestPage} from '../test/test';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class loginPage {

  constructor(public navCtrl: NavController,public auth: AuthService) {}

  Login(){
    this.auth.login();

    this.navCtrl.push('test/test');

  }

}
