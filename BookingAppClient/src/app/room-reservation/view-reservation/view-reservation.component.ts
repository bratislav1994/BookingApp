import { Component, OnInit } from '@angular/core';
import { ReservationService } from "app/room-reservation/reservation.service";
import { RoomReservation } from "app/room-reservation/Reservation.model";
@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css'],
  providers: [ReservationService]
})
export class ViewReservationComponent implements OnInit {

  reservations: RoomReservation[];

  constructor(private reservationService : ReservationService) { 
    this.reservations = [];
  }

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe();
  }
}
