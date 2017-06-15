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


  getAllReservations() : Observable<any> {
        return this.http.get("http://localhost:54043/api/RoomReservations/ReadAll");
  }

    getReservationById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/RoomReservations/Read/${id}`);
  }

  getReservationByIdMap(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/RoomReservations/Read/${id}`).map(r => r.json());
    }

  deleteReservation(id : number) : Observable<any> {
      let opts = DynamicUrl.PutHeader();
        return this.http.delete(`http://localhost:54043/api/RoomReservations/Delete/${id}`, opts);
    }

    editReservation(reservation: RoomReservation) : Observable<any> {
       let opts = DynamicUrl.PutHeader();
        return this.http.put(`http://localhost:54043/api/RoomReservations/Change`, reservation, opts);
    }

}
