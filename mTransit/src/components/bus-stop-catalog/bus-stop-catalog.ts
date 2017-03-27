import { Component } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { BusStop } from '../bus-stop/bus-stop';

@Component({
      providers:[BusStopService]

})
export class BusStopCatalog {

    stop_services: BusStopService
    //stop_services: any;
    catalog: BusStop[]

    constructor(
        public busSrv:BusStopService

    ) {
        //this.stop_services = new BusStopService();
        console.log("From bustop catalog");
    }

    createStopObjArray(){
       this.busSrv.load();
       console.log("MALAKA");
    
        // for(let bs of this.stop_services.data){

        //     let currentStop = new BusStop(bs.stop_id, bs.stop_name, bs.stop_lat, bs.stop_lon, bs.wheelchair_boarding);
        //      this.catalog.push(currentStop);

        // } 

    }

    getNearBusStops(){
        return this.catalog;
    }

}  