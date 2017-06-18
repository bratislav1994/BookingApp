import { Injectable } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DynamicUrl } from "app/DynamicUrl.model";
import { LocalEnum } from "app/localEnum.model";

@Injectable()
export class AccommodationService {

  constructor(private http : Http) { }

  addAccommodation(accommodation : Accommodation, file: File) : Observable<any> {
        accommodation.Place = null;
        accommodation.Rooms = null;
        accommodation.AccommodationType = null;
        let formData: FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        formData.append('uploadFile', file, file.name);
        console.log("aaaa" + formData);
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        
        headers.append('Accept', 'application/json');
         headers.append("Authorization", "Bearer " + localStorage.getItem(LocalEnum.User.toString()));
        let opts = new RequestOptions( { headers: headers });

        return this.http.post(DynamicUrl.socket + `api/accommodation`, formData, opts);
  }

  getAllAccommodationsWithQueryOData(pageNumber: number, pageSize: number, filter : string) : Observable<any> {
        let skip = (pageNumber - 1) * pageSize;
        return this.http.get(DynamicUrl.socket + `odata/OData?$top=${pageSize}&$skip=${skip} ${filter} &$expand=Place,AccommodationType &$inlinecount=allpages`);
    }

  getAllAccommodationsOData(pageNumber: number, pageSize: number) : Observable<any> {
        let skip = (pageNumber - 1) * pageSize;
        return this.http.get(DynamicUrl.socket + `odata/OData?$top=${pageSize}&$skip=${skip} &$expand=Place,AccommodationType &$inlinecount=allpages`);
  }

  getAllAccommodations() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/accommodation?$expand=AccommodationType,Place`);
  }

  getAccommodationById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/accommodation/${id}`);
  }

   getByIdMap(Id : number) : Observable<any> {
        let ret = this.http.get(DynamicUrl.socket + `api/accommodation?$filter=Id eq ${Id} &$expand=AccommodationType,Place,Rooms,Comments`).map(res => res.json());
        return ret;
      }

  edit(accommodation: Accommodation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append("Authorization", "Bearer " + localStorage.getItem(LocalEnum.User.toString()));
        console.log(JSON.stringify(accommodation));
        let opts = new RequestOptions();
        opts.headers = header;

        accommodation.Place = null;
        accommodation.AccommodationType = null;
        accommodation.Rooms = null;

        return this.http.put(DynamicUrl.socket + `api/accommodation`, JSON.stringify(accommodation), opts);
    }

     delete(id : number) : Observable<any> {
      let opts = DynamicUrl.PutHeader();
      return this.http.delete(DynamicUrl.socket + `api/accommodation/${id}`, opts);
    }

     getByFilter(query : string) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/accommodation` + query).map(res => res.json());
    }

    getCommentsByFilter(query : string) : Observable<any>{
      return this.http.get(DynamicUrl.socket + `api/Comment/ReadAll` + query).map(res => res.json());
    }

}
