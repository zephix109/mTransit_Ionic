import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMS } from 'ionic-native'; //allows us to send SMS

/*
  Generated class for the Sms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'sms-page',
  templateUrl: 'sms.html'
})
export class SmsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  sendSMS(){
    var options={
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'  
      }
    }  
    SMS.send('5149447896','1234',options)
      .then(()=>{
      },()=>{
        alert("failed");  
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SmsPage');
  }

}
