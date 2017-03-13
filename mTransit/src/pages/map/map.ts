import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StopInit } from '../../services/map/stops_Init';
 
@Component({
  selector: 'map-page',
  templateUrl: 'map.html',
  providers: [StopInit]
})
export class MapPage {

  constructor(public navCtrl: NavController, public platform: Platform, public stopinit : StopInit) {}

  showStops(){
    this.stopinit.showStops();
  }

  //Moved all source code to ../services/map/stop_Init.ts in order to not cluster map.ts

}