import { Component, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NavController, Nav } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SmsPage } from '../sms/sms';
import { RatingPagePage } from '../rating-page/rating-page';
import { DriverLoginPage } from '../driver-login/driver-login';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';

@Component({
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {
    
    constructor(public navCtrl: NavController, public translateService: TranslateService) { }

    public ionViewDidLoad() {
        this.translateService.setDefaultLang('en');
    }

    //function that logs the user in. It currently redirects to map page, but will redirect to SMS when that functionality is completed.
    public facebookLogin() {
        Facebook.login(['email']).then((response) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);

            firebase.auth().signInWithCredential(facebookCredential)
                .then((success) => {
                    //console.log("Firebase success: " + JSON.stringify(success));
                    this.goToMap();
                })
                .catch((error) => {
                    //console.log("Firebase failure: " + JSON.stringify(error));
                });

        }).catch((error) => { /*console.log(error)*/ });
    }

    //function that loads the map page
    public goToMap() {
        this.navCtrl.push(MapPage);
    }

    //function that loads the SMS verification page
    public goToSMS() {
        this.navCtrl.push(SmsPage);
    }
    //function that loads the driver login page
    public goToDriverLogin() {
        this.navCtrl.push(DriverLoginPage);
    }
    public goToRating() {
        this.navCtrl.push(RatingPagePage);
    }
    //function that changes the language from Englishs to French and vice versa
    public swapLanguage() {
        if (this.translateService.currentLang == "en") {
            this.translateService.use('fr');
        } else {
            this.translateService.use('en');
        }
    }
}
