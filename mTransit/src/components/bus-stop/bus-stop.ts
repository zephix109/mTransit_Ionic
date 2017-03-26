import { Component } from '@angular/core';

export class BusStop {

    stop_id: number
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
    stop_wheelChair: number;
    stop_passengerCount: number;

    constructor(id: number, name: string, lat: number, lng: number, wheelchair: number) {
        
        this.stop_id = id;
        this.stop_name = name;
        this.stop_lat = lat;
        this.stop_lon = lng;
        this.stop_wheelChair = wheelchair;
    
    }

    public getName(){
        return this.stop_name;
    }

    public getLat(){
        return this.stop_lat;
    }

    public getLon(){
        return this.stop_lon;
    }  

    public getWheelChairCount(){
        return this.stop_wheelChair;
    }

    getPassengerCount(){
        return this.stop_passengerCount;
    }

    setPassengerCount( count : number){
        this.stop_passengerCount += count;
    }
}