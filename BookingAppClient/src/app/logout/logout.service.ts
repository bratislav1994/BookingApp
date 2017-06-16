import { Injectable } from '@angular/core';
import { User } from "app/registration/user.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalEnum } from "app/localEnum.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class LogoutService {

  constructor(private http : Http) { }

   logout() : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        let ret = this.http.post(DynamicUrl.socket + `api/Account/Logout`, "", opts);
        
        localStorage.removeItem(LocalEnum.User.toString());
        localStorage.removeItem(LocalEnum.Id.toString());
        localStorage.removeItem(LocalEnum.Role.toString());
        localStorage.removeItem(LocalEnum.Username.toString());

        return ret;
    }
}
