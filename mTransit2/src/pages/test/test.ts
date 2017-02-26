import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class loginPage {

  constructor(public navCtrl: NavController,public auth: AuthService) {}

}
