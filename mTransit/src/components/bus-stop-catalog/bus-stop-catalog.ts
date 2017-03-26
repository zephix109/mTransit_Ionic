import { Component } from '@angular/core';
import { BusStop } from '../bus-stop/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';

export class BusStopCatalog {

    stop_services: BusStopService;
    catalog: BusStop[]

    constructor() {
        
    }

    createStopObjArray( ){
        this.stop_services.load();
        for(let bs of this.stop_services.data){

            let currentStop = new BusStop(bs.stop_id, bs.stop_name, bs.stop_lat, bs.stop_lon, bs.wheelchair_boarding);
             this.catalog.push(currentStop);

        } 

    }

    getNearBusStops(){
        return this.catalog;
    }

}