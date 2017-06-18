import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppUser } from "app/manager/appUser.model";
import { LocalEnum } from "app/localEnum.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class ManagerService {

  constructor(private http : Http) { }

  getAllManagers() : Observable<any>{
        let opts = DynamicUrl.PutHeader();

        return this.http.get(DynamicUrl.socket + `api/manager`, opts);
    }

    banOrUnban(Id : number) : Observable<any>{
        let opts = DynamicUrl.PutHeader();

        return this.http.delete(DynamicUrl.socket + `api/manager/${Id}`,opts);
    }

}
