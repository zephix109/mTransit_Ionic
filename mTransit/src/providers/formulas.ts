import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Formulas {

    constructor() {/*Formula constructor not used*/ }

    /*
    * Function applyHaversine
    *
    * Input:
    *  - Array representing bus_stop JSON list
    *  - user's current latitude
    *  - user's current longitude
    *
    * Function iterates through every item in the Array and creates a new field named "distance" which is the distance between 
    * the user's location and the item's location. This calculation is called the Haversine formulas which is called at this.getDistanceBetweenPoints
    */
    public applyHaversine(busStopJSONarr, userLat: number, userLon: number) {

        const usersLocation = {
            lat: userLat,
            lng: userLon
        };

        busStopJSONarr.map((location) => {
            const placeLocation = {
                lat: location.stop_lat,
                lng: location.stop_lon
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'km'
            ).toFixed(2);
        });
    }

    public applyHaversineBus(arr, userLat: number, userLon: number) {

        const usersLocation = {
            lat: userLat,
            lng: userLon
        };

        arr.map((location) => {
            const placeLocation = {
                lat: location.shape_pt_lat,
                lng: location.shape_pt_lon
            };

            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'km'
            ).toFixed(2);
        });
    }

    //Calculation for Haversine formulas
    public getDistanceBetweenPoints(start, end, units) {

        const earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        const R = earthRadius[units || 'km'];
        const lat1 = start.lat;
        const lon1 = start.lng;
        const lat2 = end.lat;
        const lon2 = end.lng;

        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;
    }

    public toRad(x) {
        return x * Math.PI / 180;
    }

    public getClosestStop(arr: any, myLat: number, myLng: number) {

        return new Promise(resolve => {
            let tempArr = arr;
            //console.log("test lat: " + myLat);
            Promise.all([
                // 1 - Create and calculate 'distance' value for each item in the array
                this.applyHaversineBus(tempArr, myLat, myLng),
                // 2 - Sort array
                tempArr.sort((busStopA, busStopB) => {
                    return busStopA.distance - busStopB.distance;
                }),
                // 3 - Show only the first 20
                tempArr = tempArr.slice(0, 1),
                resolve(tempArr)
            ]);
        });
    }
}
