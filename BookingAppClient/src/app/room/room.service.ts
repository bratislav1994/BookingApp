import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Room } from "app/room/Room.model";

@Injectable()
export class RoomService {

  constructor(private http : Http) { }

  createRoom(room : Room) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/api/Room/Create', room, opts);
    }


  getAllRooms() : Observable<any> {
        return this.http.get("http://localhost:54043/api/Room/ReadAll");
  }

  getRoomById(id : number) : Observable<any> {
      return this.http.get(`http://localhost:54043/api/Room/Read/${id}`);
  }

  getRoomByIdMap(id : number) : Observable<any>{
    return this.http.get(`http://localhost:54043/api/Room/Read/${id}`).map(r => r.json());
  }

  deleteRoom(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/api/Room/api/Room/${id}`);
    }
}
