import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMSregPage } from '../sm-sreg/sm-sreg';
import { MapPage } from '../map/map';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  Login(){

   


    var PagePromise = new Promise(function(resolve,reject){
       resolve();
    });

    PagePromise
      //TO-DO social media login
      //.then(gotomap => this.goToMap());

  }

  loginSMS(){
    this.navCtrl.push(SMSregPage);
  }
  
  userLogin(){
    //TO-DO login functions
  }

  goToMap(){

     this.navCtrl.push(MapPage);
  }

}
