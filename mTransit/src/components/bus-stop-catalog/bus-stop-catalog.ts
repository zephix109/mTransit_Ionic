import { Component } from '@angular/core';
import { BusStop } from '../bus-stop/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';

export class BusStopCatalog {

    public catalog: BusStop[];
    constructor(public stop_services: BusStopService) { }

    public createStopObjArray() {
        for (const bs of this.stop_services.data) {
            const currentStop = new BusStop(bs.stop_id, bs.stop_name, bs.stop_lat, bs.stop_lon, bs.wheelchair_boarding);
            this.addBusStop(currentStop);
        }
    }

    public getNearBusStops() {
        return this.catalog;
    }

    public addBusStop(busStop) {
        this.catalog.push(busStop);
    }
}