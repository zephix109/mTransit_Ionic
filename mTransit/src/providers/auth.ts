import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Facebook } from "@ionic-native/facebook";
import * as firebase from 'firebase';


@Injectable()
export class Auth {
 
  public token: any;
 
  constructor(public http: Http, public storage: Storage) {
 
  }
 
  fbLogin(){
      Facebook.login(['email']).then( (response) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
              console.log("Firebase success: " + JSON.stringify(success));
              this.storage.set('token', facebookCredential);              
          })
          .catch((error) => {
              console.log("Firebase failure: " + JSON.stringify(error));
              alert("Oops, you couldn't login.");
          });

      }).catch((error) => { console.log(error) });
  }



  checkAuthentication(){
 
    //return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            //this.token = value;
            if(value){
              return true;
            }

            return false;
            // let headers = new Headers();
            // headers.append('Authorization', this.token);
 
            // this.http.get('https://mtransit390.herokuapp.com/api/auth/protected', {headers: headers})
            //     .subscribe(res => {
            //         resolve(res);
            //     }, (err) => {
            //         reject(err);
            //     }); 
 
        });         
 
   //});
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}