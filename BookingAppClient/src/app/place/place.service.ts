import { Injectable } from '@angular/core';
import { Place } from "app/place/place.model";
import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaceService {

  constructor(private http : Http) { }

   addPlace(place : Place) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54043/place/AddPlace`, place, opts);
    }

    getAllPlaces() : Observable<any> {
        return this.http.get("http://localhost:54043/place/AllPlaces");
    }

    getPlaceById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/place/GetPlace/${id}`);
    }

    deletePlace(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/place/DeletePlace/${id}`);
    }

    editPlace(place: Place) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(`http://localhost:54043/place/ChangePlace`, place, opts);
    }

}
