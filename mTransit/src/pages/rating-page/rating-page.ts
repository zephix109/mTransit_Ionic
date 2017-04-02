import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';


/*
  Generated class for the RatingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rating-page',
  templateUrl: 'rating-page.html'
})
export class RatingPagePage {

  private rate: number;
  private comment: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {}

  onModelChange(){
    
  }

  finishReview() {
    if(this.rate > 0){
      console.log(this.rate);
      console.log(this.comment);
    }
  }
  
}