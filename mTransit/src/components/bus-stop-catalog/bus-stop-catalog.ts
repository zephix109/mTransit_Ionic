import { Component } from '@angular/core';
import { BusStop } from '../bus-stop/bus-stop';
import { BusStopService } from '../../providers/bus-stop-service';

export class BusStopCatalog {

    catalog: BusStop[]

    constructor(public stop_services : BusStopService) {
        stop_services.load();
    }

    createStopObjArray( ){

        for(let bs of this.stop_services.data){

            let currentStop = new BusStop(bs.stop_id, bs.stop_name, bs.stop_lat, bs.stop_lon, bs.wheelchair_boarding);
            this.addBusStop(currentStop);

        }
        
        return 

    }

    addBusStop(busStop) {
        this.catalog.push(busStop);
    }
}