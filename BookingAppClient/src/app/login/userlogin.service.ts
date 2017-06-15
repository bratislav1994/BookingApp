import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from "./UserLogin.model";
import { LocalEnum } from "app/localEnum.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class UserloginService {

  constructor(private http : Http) { }

login(username : string, password : string, grant_type: string) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `oauth/token`, 
                              `username=${username}&password=${password}&grant_type=${grant_type}`, opts);
    }

     IsLoggedIn() : boolean {
         
        if (localStorage.getItem(LocalEnum.User.toString()) == null)
        {
            console.log("AAA");
            return false;
        }
        
        console.log("BBB");
        return true;
    }

   
}
