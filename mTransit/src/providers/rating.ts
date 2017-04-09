import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Rating_TDG {

    constructor(public http: Http){}

    addRating(review){

        this.http.post('http://localhost:8080/api/review/add',JSON.stringify(review));
        //this.http.post('https://mtransit390.herokuapp.com/api/review/add',JSON.stringify(review));
        console.log("adding " + review.comment + " and rate: " + review.rating);
    }

}