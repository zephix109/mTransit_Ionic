import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//import { SMSAuthService } from '../../services/auth/SMS_auth';
import { BusStopService } from '../../providers/bus-stop-service';
import { Http } from "@angular/http";

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
  http : Http;
  constructor(public navCtrl: NavController,public platform: Platform,  public bss: BusStopService ) {
    bss = new BusStopService(this.http);
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bss.load();
      console.log("Hello from test page");
    });
  }

} 


