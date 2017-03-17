import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BusStop } from "../components/bus-stop/bus-stop";
import { BusStopCatalog } from "../components/bus-stop-catalog/bus-stop-catalog";

@Injectable()
export class BusStopService {
  data: any[];
  busCatalog: BusStopCatalog;

  constructor(public http: Http) {
    console.log('Hello BusStopService Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('../assets/bus_stops/stm_stops.json')
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;

          let tempStop = new BusStop(data.bus_stops.stop_id, data.bus_stops.stop_name, data.bus_stops.stop_lat, data.bus_stops.stop_lon, data.bus_stops.wheelchair_boarding);
          
          this.busCatalog.addBusStop(tempStop);

          resolve(this.data);
        });
    });
  }

}
