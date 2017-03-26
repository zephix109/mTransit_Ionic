import { Component } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { BusStop } from '../bus-stop/bus-stop';


export class BusStopCatalog {

    stop_services: BusStopService;
    catalog: BusStop[]
    x:any;
    y:any;

    constructor() {
        this.stop_services = new BusStopService();

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