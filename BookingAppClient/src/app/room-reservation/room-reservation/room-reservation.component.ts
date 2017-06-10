import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "app/room-reservation/Reservation.model";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {
 
  @Input () reservation: RoomReservation;
  constructor() { }

  ngOnInit() {
  }

}
