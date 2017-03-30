import { Component, Optional } from '@angular/core';
import { BusStopService } from '../../providers/bus-stop-service';
import { BusStop } from '../bus-stop/bus-stop';
import { StopInit } from '../../services/map/stops_Init';

@Component({
      providers:[BusStopService, Array]
})

export class BusStopCatalog {

    nearUserCatalog: BusStop[] = [];
    destinationCatalog: BusStop[] = [];

    constructor(public stop_services: BusStopService, public mapObj: StopInit ) {
        //this.stop_services = new BusStopService();
        console.log("From bustop catalog");
    }

    findNearBusStops(){
        if(this.nearUserCatalog.length == 0){
            console.log("Finding bus stops near user"); 
            this.stop_services.load_Near_User().then(a => {
                for(let data of a){
                    let busStop = new BusStop(data.stop_id, data.stop_name, data.stop_lat, data.stop_lon, data.wheelchair_boarding);
                    this.nearUserCatalog.push(busStop);
                    
                    
                }
            });
        }

        this.mapObj.showMarkers1(this.nearUserCatalog);

    }

    getDestinationArray(){

        if(this.destinationCatalog.length > 0){
            console.log("Destination array exist and is " + this.destinationCatalog.length);
        }

        else if(this.destinationCatalog.length == 0){

            console.log("Creating destination point"); 

            this.stop_services.load_Destination(this.mapObj.clickedCoord.lat, this.mapObj.clickedCoord.lng).then(a => {
            
                for(let data of a){

                    let busStop = new BusStop(data.stop_id, data.stop_name, data.stop_lat, data.stop_lon, data.wheelchair_boarding);
                    this.destinationCatalog.push(busStop);
                    
                }
                
            });
        
            this.mapObj.showMarkers1(this.destinationCatalog);

        
        }

    }

    getNearBusStops(){
        return this.nearUserCatalog;
    }

}  