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
        return this.http.get("http://localhost:54043/api/accommodation");
  }

  getAccommodationById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/accommodation/${id}`);
  }

}
