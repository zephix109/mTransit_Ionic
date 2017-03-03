import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMSAuthService } from '../../services/auth/SMS_auth';
/*
  Generated class for the SMSreg page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sm-sreg',
  templateUrl: 'sm-sreg.html'
})
export class SMSregPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public smsAuth: SMSAuthService) {}

  ionViewDidLoad() {
    this.smsAuth.login();
  }

}
