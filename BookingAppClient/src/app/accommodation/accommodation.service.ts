import { Injectable } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationService {

  constructor(private http : Http) { }

  addAccommodation(accommodation : Accommodation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/accommodation/AddAccommodation', accommodation, opts);
  }


  getAllAccommodations() : Observable<any> {
        return this.http.get("http://localhost:54043/accommodation/AllAccommodations");
  }

  getAccommodationById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/accommodation/GetAccommodation/${id}`);
  }

}
