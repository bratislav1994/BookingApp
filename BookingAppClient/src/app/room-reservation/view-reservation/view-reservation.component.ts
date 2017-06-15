import { Component, OnInit } from '@angular/core';
import { ReservationService } from "app/room-reservation/reservation.service";
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css'],
  providers: [ReservationService]
})
export class ViewReservationComponent implements OnInit {

  reservations: RoomReservation[];

  constructor(private reservationService : ReservationService,
              private router : Router) { 
    this.reservations = [];
  }

  ngOnInit() {
    this.getReservations();
  }

   deleteReservation(id: number)
  {
    this.reservationService.deleteReservation(id).subscribe(
      e => this.getReservations());
  }

  showReservation(id : number){
    this.router.navigate(['/home/view_reservation/' + id]);
  }

  getReservations() : void{
    this.reservationService.getAllReservations().subscribe(
      r => { this.reservations = r.json();
      console.log(this.reservations[0].User.Username);} ,
      error => {
        console.log(error), alert("Unsuccessful fetch operation");
      });
  }
}
