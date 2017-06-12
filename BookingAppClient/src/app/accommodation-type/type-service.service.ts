import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from "app/accommodation-type/Type.model";
import 'rxjs/Rx';

@Injectable()
export class TypeServiceService {

  constructor(private http : Http) { }

  createType(type : AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/accommodationType/Create', type, opts);
    }

    getAllTypes() : Observable<any> {
        return this.http.get("http://localhost:54043/accommodationType/ReadAll");
    }

    getTypeById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/accommodationType/Read/${id}`);
    }

    getTypeByIdMap(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/accommodationType/Read/${id}`).map(r => r.json());
    }

    deleteType(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/accommodationType/Delete/${id}`);
    }

    editCountry(type: AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(`http://localhost:54043/accommodationType/Change`, type, opts);
    }
}
