import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

/*
  Generated class for the SmsCode page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sms-code',
  templateUrl: 'sms-code.html'
})
export class SmsCodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  validateSMS(){
    /*if(ENTEREDVAUE = 1234){
      this.goToMap();
    }
    else{
      alert("You have entered the wrong code. Please try again.");
    }*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmsCodePage');
  }

  goToMap(){
      this.navCtrl.push(MapPage);
  }

}
