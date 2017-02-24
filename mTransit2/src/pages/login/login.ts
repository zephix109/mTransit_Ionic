import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  constructor(public navCtrl: NavController) {
	
  }
  
  goToMap() {
	  this.navCtrl.push(MapPage);
  }

}
