import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

/*
  Generated class for the DriverLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'driver-login-page',
  templateUrl: 'driver-login.html'
})
export class DriverLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  //function that loads the map page
  goToMap(){
      this.navCtrl.push(MapPage);
  }

}
