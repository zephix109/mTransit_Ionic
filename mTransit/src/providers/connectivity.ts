import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
 
declare const Connection;
 
@Injectable()
export class Connectivity {
 
  public onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('cordova');
  }
 
  public isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }
 
  public isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }
 
}