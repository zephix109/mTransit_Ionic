import { Component } from '@angular/core';
import { BusStop } from '../bus-stop/bus-stop';

export class BusStopCatalog {

    constructor(public catalog: BusStop[]) {
    }

    addBusStop(busStop) {
        this.catalog.push(busStop);
    }
}