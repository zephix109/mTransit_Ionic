import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
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

    constructor(public navCtrl: NavController, public translateService: TranslateService) {}

  //function that logs the user in. It currently redirects to map page, but will redirect to SMS when that functionality is completed.
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

  //function that loads the map page
  goToMap(){
      this.navCtrl.push(MapPage);
  }

  //function that loads the SMS verification page
  goToSMS(){
      this.navCtrl.push(SmsPage);
  }

  swapLanguage() {
    if(this.translateService.currentLang == "en")
      this.translateService.use('fr');
    else
      this.translateService.use('en');
  }

}
