import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Auth0Vars } from '../../auth0-variables';
// import { Router } from '../@angular/router';
// import 'rxjs/add/operator/take';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;
declare var options: any;

@Injectable()
export class AuthService {
  
  jwtHelper: JwtHelper = new JwtHelper();

  // webAuth0 = new auth0.WebAuth({
  //   clientID: '9EZ1kXkUSwmM6Bc2CGMWNXkus5jfATeB',
  //   domain: 'mtransit.auth0.com'
  // });
  
  auth0 = new Auth0({
    clientID: '9EZ1kXkUSwmM6Bc2CGMWNXkus5jfATeB',
    domain: 'mtransit.auth0.com',
    callbackURL:  'https://mtransit.auth0.com/mobile',
    responseType: 'token'
  });

  lock = new Auth0Lock(
    '9EZ1kXkUSwmM6Bc2CGMWNXkus5jfATeB',
    'mtransit.auth0.com',  {
    auth: {
      redirect: false
      ,params: {
        scope: 'openid profile offline_access',
        device: "my-device"
      },
      sso: true
    }
  });
  
  storage: Storage = new Storage();
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  idToken: string;
  accessToken: string;
  
  constructor(private authHttp: AuthHttp, zone: NgZone) {

      this.zoneImpl = zone;

      // Check if there is a profile saved in local storage
      this.storage.get('profile').then(profile => {
        this.user = JSON.parse(profile);
      }).catch(error => {
        console.log(error);
      });

      this.storage.get('access_token').then(token => {
        this.accessToken = token;
      });
       
        //Once user is logged, trigger here
      this.lock.on("authenticated", authResult => {
        if (authResult && authResult.accessToken && authResult.idToken) {

          this.storage.set('access_token', authResult.accessToken);
          this.storage.set('idToken', authResult.idToken);
          this.storage.set('refresh_token', authResult.refreshToken);
          this.idToken = authResult.idToken;
          this.accessToken = authResult.accessToken;

          //Fetch profile informatio
          this.lock.getUserInfo(this.accessToken, (error, profile) => {
            if (error) {
              //Handle error
              alert(error);
              return;
            }

            profile.user_metadata = profile.user_metadata || {};
            this.storage.set('profile', JSON.stringify(profile));
            this.user = profile;
          });

          if(this.user = null){
            alert("uh oh");
          }

          this.lock.hide();

          this.zoneImpl.run(() => this.user = authResult.profile);

          //Schedule a token refresh
          this.scheduleRefresh();

        }

      });
      

        this.lock.on('authorization_error', function(error) {
          var options = { 
            languageDictionary: {
              error: {
                login: {
                  "lock.invalid_email_password": "Custom message about invalid credentials",
                  "lock.network": "Custom message indicating a network error and suggesting the user check connection",
                  "lock.unauthorized": "Custom message about a failure of permissions",
                  "too_many_attempts": "Custom message indicating the user has failed to login too many times."
                }
              }
            }
          };

          this.lock.show(options);
        });

  }

  public authenticated() { 
    return tokenNotExpired('id_token', this.idToken);
  }
  
  public login()  {
    // Show the Auth0 Lock widget
    var options = {
      socialButtonStyle: 'small',
      autoclose: true,
      allowSignUp: true,
      theme: {
        logo:'http://i.imgur.com/ggzwIHN.png',
        primaryColor: 'blue',
      },
      languageDictionary: {
        title: "Log in",
        emailInputPlaceholder: "Test"
      },
      sso: false
    };
    this.lock.show(options);
  }
  
  public logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }

  public scheduleRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token

  let source = Observable.of(this.idToken).flatMap(
    token => {
      console.log('token here', token);
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIat = this.jwtHelper.decodeToken(token).iat;
      let jwtExp = this.jwtHelper.decodeToken(token).exp;
      let iat = new Date(0);
      let exp = new Date(0);
      
      let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
      
      return Observable.interval(delay);
    });
    
  this.refreshSubscription = source.subscribe(() => {
    this.getNewJwt();
  });
}

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = Observable.of(this.idToken).flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;
          
          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });
      
        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        source.subscribe(() => {
          this.getNewJwt();
          this.scheduleRefresh();
        });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.storage.get('refresh_token').then(token => {
      this.auth0.refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.storage.set('id_token', delegationRequest.id_token);
        this.idToken = delegationRequest.id_token;
      });
    }).catch(error => {
      console.log(error);
    });
    
  }



}