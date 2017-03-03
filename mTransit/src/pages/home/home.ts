import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth/auth.service';
import { SMSregPage } from '../sm-sreg/sm-sreg';
import { MapPage } from '../map/map';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthService) {}

  Login(){

    //this.auth.login();


    var PagePromise = new Promise(function(resolve,reject){
       resolve();
    });

    PagePromise
      //.then(doAuth => this.userLogin())
      .then(test => {
        alert("test");
      })
      .then(checkAuth => 
      {
        alert("we're here");
      })
      .then(gotomap => this.goToMap());

  }

  loginSMS(){
    this.navCtrl.push(SMSregPage);
  }
  
  userLogin(){
    this.auth.login(); //Does actual login here
  }

  goToMap(){

     this.navCtrl.push(MapPage);
  }

}
