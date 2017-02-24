import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Auth0Vars } from '../../auth0-variables';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;
declare var options: any;

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  webAuth = new auth0.WebAuth({
    clientID: '9EZ1kXkUSwmM6Bc2CGMWNXkus5jfATeB', 
    domain: 'mtransit.auth0.com' 
  });

  lock = new Auth0Lock(
    '9EZ1kXkUSwmM6Bc2CGMWNXkus5jfATeB'
    , 'mtransit.auth0.com',  
    {
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      },
      sso: false
      
    }
  });
  
  storage: Storage = new Storage();
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  idToken: string;
  accessToken: string;

    phoneNumber: string;
    enterPhone: string;
    enterCode: string;
  
  
  constructor(private authHttp: AuthHttp, zone: NgZone) {
    this.zoneImpl = zone;




    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log( error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    })

    // Listening for the authenticated event

    this.lock.on('authenticated', authResult => {
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

     //alert(authResult['access_token']);

    // var auth0Manage = this.auth0.Management({

    //   domain: 'mtransit.auth0.com',
    //   token: this.idToken
    // });

      // Fetch profile information
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        
        if (error) {
          // Handle error
          alert("test" + error);
          return;
        }

        
        profile.user_metadata = profile.user_metadata || {};
     //   this.storage.set('accessToken', authResult.accessToken);
        this.storage.set('profile', JSON.stringify(profile));
        this.user = profile;
      });

      this.lock.hide();

      this.storage.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
      // Schedule a token refresh
      //this.scheduleRefresh();

    });    
    }

  public authenticated() { 
    return tokenNotExpired('id_token', this.idToken);
  }
  
  public login() {
    //Define options (what the widget looks like)
    var options = {
      socialButtonStyle: 'small',
      theme: {
        logo:'http://i.imgur.com/ggzwIHN.png',
        primaryColor: '#387ef5',
      },
      languageDictionary: {
        title: "Log in",
        emailInputPlaceholder: "Test"
      }
    };

    // Show the Auth0 Lock widget
    this.lock.show(options);
  }
  
  public logout() {
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    //this.unscheduleRefresh();
  }

  public loginViaGoogle(){

        this.auth0.login({
            connection: 'google-oauth2'
        });

  }

  public setSocialMedia(){
    options = {
        allowedConnections: ['twitter','facebook', 'linkedin']
    };
  }

  public send_SMS(){
    var phoneNumber = ('input.phone-number');
    this.auth0.requestSMSCode({ phoneNumber:phoneNumber}, function(err) {
      if (err) {
        alert('error sending SMS: '+ err.error_description);
        return;
      }
      // the request was successful and you should
      // receive the passcode to the specified phone
      this.$('.enter-phone').hide();
      this.$('.enter-code').show();
    });
  }

  public verify_SMS(){
    var phone = ('input.phone-number');
    var code = ('input.code');
    //submit the passcode to authenticate the phone
    this.auth0.verifySMSCode({ phoneNumber: phone, code: code }, function(err){
      alert('code verification failed. ' + err.statusCode + ' '+ err.error);
    });
  };
  
}