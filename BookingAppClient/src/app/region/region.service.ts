import { Injectable } from '@angular/core';
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionService {

  constructor(private http : Http) { }

  addRegion(region : Region) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/region/AddRegion', region, opts);
    }


  getAllRegions() : Observable<any> {
        return this.http.get("http://localhost:54043/region/AllRegions");
  }

    getRegionById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/region/GetRegion/${id}`);
  }

  getRegionByIdMap(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/region/GetRegion/${id}`).map(r => r.json());
    }

  deleteRegion(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/region/DeleteRegion/${id}`);
    }

    editRegion(region: Region) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(`http://localhost:54043/region/ChangeRegion`, region, opts);
    }

}
