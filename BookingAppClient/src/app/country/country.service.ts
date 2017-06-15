import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Country } from "./Country.model";
import 'rxjs/Rx';
import { DynamicUrl } from "app/DynamicUrl.model";
import { LocalEnum } from "app/localEnum.model";

@Injectable()
export class CountryService {

  constructor(private http : Http) { }

  addCountry(country : Country) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `api/country`, country, opts);
    }

    getAllCountries() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/country`);
    }

    getCountryById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/country/${id}`);
    }

    getCountryByIdMap(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/country?$filter=Id eq ${id} &$expand=Regions`).map(r => r.json());
    }

    deleteCountry(id : number) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.delete(DynamicUrl.socket + `api/country/${id}`, opts);
    }

    editCountry(country: Country) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.put(DynamicUrl.socket + `api/country`, country, opts);
    }
}