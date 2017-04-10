import { Component } from '@angular/core';

export class BusStop {

    private stop_id: number;
    private stop_name: string;
    private stop_lat: number;
    private stop_lon: number;
    private stop_wheelChair: number;
    private stop_passengerCount: number;

    constructor(id: number, name: string, lat: number, lng: number, wheelchair: number) {
        this.stop_id = id;
        this.stop_name = name;
        this.stop_lat = lat;
        this.stop_lon = lng;
        this.stop_wheelChair = wheelchair;

    }

    public getName() {
        return this.stop_name;
    }

    public getLat() {
        return this.stop_lat;
    }

    public getLon() {
        return this.stop_lon;
    }

    public getWheelChairCount() {
        return this.stop_wheelChair;
    }

    public getPassengerCount() {
        return this.stop_passengerCount;
    }

    public setPassengerCount(count: number) {
        this.stop_passengerCount += count;
    }
}