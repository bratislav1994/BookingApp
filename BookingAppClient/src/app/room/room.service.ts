import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Room } from "app/room/Room.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class RoomService {

  constructor(private http : Http) { }

  createRoom(room : Room) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `api/Room/Create`, room, opts);
    }


  getAllRooms() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/Room/ReadAll`);
  }

  getRoomById(id : number) : Observable<any> {
      return this.http.get(DynamicUrl.socket + `api/Room/Read/${id}`);
  }

  getRoomByIdMap(id : number) : Observable<any>{
    let ret = this.http.get(DynamicUrl.socket + `api/Room/Read/${id}`).map(r => r.json());
    return ret;
  }

  deleteRoom(id : number) : Observable<any> {
      let opts = DynamicUrl.PutHeader();
      return this.http.delete(DynamicUrl.socket + `api/Room/Delete/${id}`, opts);
    }

    editRoom(room: Room) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.put(DynamicUrl.socket + `api/Room/Change`, room, opts);
    }
}
