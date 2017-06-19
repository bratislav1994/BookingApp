import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class ReservationService {

   constructor(private http : Http) { }

  createReservation(reservation : RoomReservation) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `api/RoomReservations/Create`, reservation, opts);
    }

  getAllReservationsFromUserId(Id: number) : Observable<any> {
      return this.http.get(DynamicUrl.socket + `api/RoomReservations/ReadAll?$filter=UserId eq ${Id} &$expand=Room, Room/Accommodation`).map(res => res.json() );
  }

  getAllReservations() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/RoomReservations/ReadAll`);
  }

  getAllReservationsById(id: number) : Observable<any> {
      let query = `?$filter=UserId eq ${id} &$expand=Room, Room/Accommodation`;
        return this.http.get(DynamicUrl.socket + `api/RoomReservations/ReadAll`);
  }

    getReservationById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/RoomReservations/Read/${id}`);
  }

  getReservationByzIdMap(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `api/RoomReservations/Read/${id}`).map(r => r.json());
    }

  deleteReservation(id : number) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.delete(DynamicUrl.socket + `api/RoomReservations/Cancel/${id}`, opts);
    }

    editReservation(reservation: RoomReservation) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.put(DynamicUrl.socket + `api/RoomReservations/Change`, reservation, opts);
    }

}
