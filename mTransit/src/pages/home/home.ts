import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SmsPage } from '../sms/sms';
import {Facebook} from '@ionic-native/facebook';
import firebase from 'firebase';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {
    
  }

  facebookLogin(){
      Facebook.login(['email']).then( (response) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
              console.log("Firebase success: " + JSON.stringify(success));
              this.goToMap();
              //this.goToSMS();
          })
          .catch((error) => {
              console.log("Firebase failure: " + JSON.stringify(error));
              alert("Oops, you couldn't login.");
          });

      }).catch((error) => { console.log(error) });
  }

/*
  Login(){

    var PagePromise = new Promise(function(resolve,reject){
       resolve();
    });

    PagePromise
      //TO-DO social media login
      //.then(gotomap => this.goToMap());

  }
  
  userLogin(){
    //TO-DO login functions
  }
*/

  goToMap(){
      this.navCtrl.push(MapPage);
  }

  goToSMS(){
      this.navCtrl.push(SmsPage);
  }

}
