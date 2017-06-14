import { Injectable } from '@angular/core';
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class RegionService {

  constructor(private http : Http) { }

  addRegion(region : Region) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + 'api/region', region, opts);
    }


  getAllRegions() : Observable<any> {
        return this.http.get(DynamicUrl.socket + "api/region");
  }

    getRegionById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/region/${id}`);
  }

  getRegionByIdMap(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/region?$filter=Id eq ${id} &$expand=Places,Country`).map(r => r.json());
    }

  deleteRegion(id : number) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.delete(DynamicUrl.socket + `api/region/${id}`, opts);
    }

    editRegion(region: Region) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.put(DynamicUrl.socket + `api/region`, region, opts);
    }
}
