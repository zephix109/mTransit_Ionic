import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { Rating_TDG } from '../../providers/rating';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public rateNow: Rating_TDG) {}

  finishReview() {
    if(this.rate > 0){

      let review = {
        rating: this.rate,
        comment:  this.comment
      }

      this.rateNow.addRating(review);
      console.log("Thank you for rating")
    }
  }
  
}
