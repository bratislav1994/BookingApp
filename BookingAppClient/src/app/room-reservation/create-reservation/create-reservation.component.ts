import { Component, OnInit } from '@angular/core';
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { ReservationService } from "app/room-reservation/reservation.service"

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
  providers: [ReservationService]
})
export class CreateReservationComponent implements OnInit {

   StartDate: Date;
   EndDate: Date; 

  constructor(private reservaionService: ReservationService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.reservaionService.createReservation(new RoomReservation(this.StartDate, this.EndDate)).subscribe();

  }
}
