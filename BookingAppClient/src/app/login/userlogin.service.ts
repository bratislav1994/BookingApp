import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from "./UserLogin.model";

@Injectable()
export class UserloginService {

  constructor(private http : Http) { }

login(username : string, password : string, grant_type: string) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54043/oauth/token`, 
                              `username=${username}&password=${password}&grant_type=${grant_type}`, opts);
    }

     IsLoggedIn() : boolean {
         
        if (localStorage.getItem("user") == null)
        {
            console.log("AAA");
            return false;
        }
        
        console.log("BBB");
        return true;
    }
}
