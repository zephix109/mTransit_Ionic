import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//import { SMSAuthService } from '../../services/auth/SMS_auth';
//import { BusStopService } from '../../providers/bus-stop-service';
import { BusStopCatalog } from '../../components/bus-stop-catalog/bus-stop-catalog';
import { Http } from "@angular/http";
import { BusStopService } from '../../providers/bus-stop-service';

/*
  Generated class for the SMSreg page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sm-sreg',
  templateUrl: 'sm-sreg.html',
  providers:[BusStopService]
})

export class SMSregPage {
  http : Http;

  constructor(public navCtrl: NavController,public platform: Platform, public busSrv:BusStopService, public bsc: BusStopCatalog = new BusStopCatalog(busSrv) ) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bsc.createStopObjArray();
      
      console.log("Hello from test page");
      //console.log(this.bsc.getNearBusStops());
    });
  }

} 


