import { Component } from '@angular/core';
import { MapPage } from '../map/map';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {
  mapPage = MapPage;

  constructor(public navCtrl: NavController) {

  }

}
