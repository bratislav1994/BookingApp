import { Component, OnInit } from '@angular/core';
import { RoomReservation } from "app/room-reservation/reservation.model";
import { ReservationService } from "app/room-reservation/reservation.service";
import { LocalEnum } from "app/localEnum.model";

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css'],
  providers: [ReservationService]
})
export class MyReservationComponent implements OnInit {

  myReservations : RoomReservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getAllReservationsFromUserId(parseInt(localStorage.getItem(LocalEnum.Id.toString()))).subscribe(
      r => 
      {
        this.myReservations = r;
      },
      error => 
      {
        console.log(error.json().Message);
      }
    );
  }

  cancelReservation(id : number) {
    this.reservationService.deleteReservation(id).subscribe(
      r => 
      {
        this.myReservations.find(r => r.Id == id).Canceled = true;
      },
      error =>
      {
        alert(error.json().Message);
      }
    );
  }

}
