import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RoomReservation } from "app/room-reservation/Reservation.model";

@Injectable()
export class ReservationService {

   constructor(private http : Http) { }

  createReservation(reservation : RoomReservation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/api/RoomReservations/Create', reservation, opts);
    }


  getAllReservations() : Observable<any> {
        return this.http.get("http://localhost:54043/api/RoomReservations/ReadAll");
  }

    getReservationById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/RoomReservations/Read/${id}`);
  }

  getReservationByIdMap(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/RoomReservations?$filter=Id eq ${id} &$expand=Description`).map(r => r.json());
    }

  deleteReservation(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54043/api/RoomReservations/${id}`);
    }

    editReservation(reservation: RoomReservation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(`http://localhost:54043/api/RoomReservations`, reservation, opts);
    }

}
