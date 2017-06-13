import { Injectable } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccommodationService {

  constructor(private http : Http) { }

  addAccommodation(accommodation : Accommodation, file: File) : Observable<any> {
        accommodation.Place = null;
        accommodation.Rooms = null;
        accommodation.AccommodationType = null;
        let formData: FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        formData.append('uploadFile', file, file.name);
        console.log("aaaa" + formData);
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        
        headers.append('Accept', 'application/json');
        let opts = new RequestOptions( { headers: headers });

        return this.http.post('http://localhost:54043/api/accommodation', formData, opts);
  }

  getAllAccommodations() : Observable<any> {
        return this.http.get('http://localhost:54043/api/accommodation?$expand=AccommodationType,Place');
  }

  getAccommodationById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/accommodation/${id}`);
  }

   getByIdMap(Id : number) : Observable<any> {
        let ret = this.http.get(`http://localhost:54043/api/accommodation?$filter=Id eq ${Id} &$expand=AccommodationType,Place,Rooms`).map(res => res.json());
        return ret;
      }

  edit(accommodation: Accommodation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        console.log(JSON.stringify(accommodation));
        let opts = new RequestOptions();
        opts.headers = header;

        accommodation.Place = null;
        accommodation.AccommodationType = null;
        accommodation.Rooms = null;

        return this.http.put(`http://localhost:54043/api/accommodation`, JSON.stringify(accommodation), opts);
    }

     delete(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/api/accommodation/${id}`);
    }

}
