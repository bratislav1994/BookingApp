import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Country } from "./Country.model";

@Injectable()
export class CountryService {

  constructor(private http : Http) { }

  addCountry(country : Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/country/AddCountry', country, opts);
    }

    getAllCountries() : Observable<any> {
        return this.http.get("http://localhost:54043/country/AllCountries");
    }

    getCountryById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/country/GetCountry/${id}`);
    }

    deleteCountry(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/country/DeleteCountry/${id}`);
    }

    editCountry(country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(`http://localhost:54043/country/ChangeCountry`, country, opts);
    }
}