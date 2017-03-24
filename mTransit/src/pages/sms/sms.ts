import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SmsCodePage} from '../sms-code/sms-code';
import { Sim } from 'ionic-native';
import {SMS} from 'ionic-native'; //allows us to send SMS
import twilio from 'twilio';
/*
  Generated class for the Sms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var userNumber;

@Component({
  //selector: 'page-sms',
  selector: 'sms-page',
  templateUrl: 'sms.html'
})

export class SmsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  twilioSMS() {
    // Twilio Credentials 
    var accountSid = 'AC9b6f2ff05983a8b535433b078903b2e4'; 
    var authToken = '85aa464bcffd521a2a09ca66c64591f1'; 
    
    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken); 
    
    client.messages.create({ 
        to: "+15147067272", 
        from: "+14387933164", 
        body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
    }, function(err, message) { 
      alert("in error section");
        console.log(message.sid);
        
    });
    alert("create function complete");
  }

  changeText(){
    alert();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmsPage');
  }

}

Sim.getSimInfo().then(
  (info) => userNumber = info.phoneNumber,
  (err) => console.log(err)
);

Sim.hasReadPermission().then(
  (info) => console.log('Has permission:', info)
);

Sim.requestReadPermission().then(
  () => console.log('Permission granted'),
  () => console.log('Permission denied')
);