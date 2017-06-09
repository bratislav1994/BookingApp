import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from "./UserLogin.model";

@Injectable()
export class UserloginService {

  constructor(private http : Http) { }

login(user : User) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/Account/Login', JSON.stringify(user), opts);
    }
}
