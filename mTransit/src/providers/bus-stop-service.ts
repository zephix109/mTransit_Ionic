import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BusStopService {
  data: any[];

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
        resolve(this.data);
      });
  });
}

}
