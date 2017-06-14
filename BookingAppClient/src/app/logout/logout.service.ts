import { Injectable } from '@angular/core';
import { User } from "app/registration/user.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalEnum } from "app/localEnum.model";

@Injectable()
export class LogoutService {

  constructor(private http : Http) { }

   logout() : Observable<any> {
        
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LocalEnum.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        let ret = this.http.post(`http://localhost:54043/api/Account/Logout`, "", opts);
        localStorage.removeItem(LocalEnum.User.toString());
        localStorage.removeItem(LocalEnum.Id.toString());
        localStorage.removeItem(LocalEnum.Role.toString());
        localStorage.removeItem(LocalEnum.Username.toString());

        return ret;
    }
}
