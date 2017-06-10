import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from "././AccommodationType.model";

@Injectable()
export class AddTypeService {

  constructor(private http : Http) { }

  addNewType(type : AccommodationType){
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/accommodationType/Create', type, opts);
  }
}
