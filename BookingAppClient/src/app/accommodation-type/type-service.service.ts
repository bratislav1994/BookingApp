import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from "app/accommodation-type/Type.model";
import 'rxjs/Rx';
import { UrlService } from "app/url.service";

@Injectable()
export class TypeServiceService {

  constructor(private http : Http) { }

  createType(type : AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(UrlService.socket + `accommodationType/Create`, type, opts);
    }

    getAllTypes() : Observable<any> {
        return this.http.get(UrlService.socket + `accommodationType/ReadAll`);
    }

    getTypeById(id : number) : Observable<any> {
        return this.http.get(UrlService.socket + `accommodationType/Read/${id}`);
    }

    getTypeByIdMap(id : number) : Observable<any> {
        return this.http.get(UrlService.socket + `accommodationType/Read/${id}`).map(r => r.json());
    }

    deleteType(id : number) : Observable<any> {
        return this.http.delete(UrlService.socket + `accommodationType/Delete/${id}`);
    }

    editCountry(type: AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(UrlService.socket + `accommodationType/Change`, type, opts);
    }
}
