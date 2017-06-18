import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class PaginationService {

  static pageSize: number = 4;
  static numberOfPages: number;

  constructor() { }

  calculateNumberOfPages(response: Response){
      PaginationService.numberOfPages = Math.ceil(response.json()["odata.count"]/PaginationService.pageSize);
    }

}