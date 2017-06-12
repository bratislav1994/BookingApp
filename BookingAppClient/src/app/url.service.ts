import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlService {
   static socket : string;
  
  constructor() 
  {
    UrlService.socket = "http://localhost:54043/";
   }

}
