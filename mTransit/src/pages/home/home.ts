import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth.service';

import { MapPage } from '../map/map';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthService) {}

  googleLogin(){
    this.auth.login();
  }

  Login(){
    this.auth.login();
    this.goToMap();
  }
  
  goToMap() {
	  this.navCtrl.push(MapPage);
  }

}
