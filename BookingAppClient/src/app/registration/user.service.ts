import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserRegistration } from "app/registration/Userregistration.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  register(user : UserRegistration) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(DynamicUrl.socket + `api/Account/Register`, user, opts);
    }
}
