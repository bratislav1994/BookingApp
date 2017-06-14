import { Injectable } from '@angular/core';
import { Place } from "app/place/place.model";
import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class PlaceService {

  constructor(private http : Http) { }

   addPlace(place : Place) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `api/place`, place, opts);
    }

    getAllPlaces() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/place`);
    }

    getPlaceById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/place/${id}`);
    }

    getPlaceByIdMap(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/place/${id}`).map(r => r.json());
    }

    deletePlace(id : number) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.delete(DynamicUrl.socket + `api/place/${id}`, opts);
    }

    editPlace(place: Place) : Observable<any> {
       let opts = DynamicUrl.PutHeader();
        return this.http.put(DynamicUrl.socket + `api/place`, place, opts);
    }

}
