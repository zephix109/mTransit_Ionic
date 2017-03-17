import { Component } from '@angular/core';
import { BusStop } from '../bus-stop/bus-stop';

export class BusStopCatalog {

    catalog: BusStop[]

    constructor() {
    }

    addBusStop(busStop) {
        this.catalog.push(busStop);
    }
}