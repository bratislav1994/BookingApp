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
    this.reservationService.getAllReservations().subscribe(c => this.reservations = c.json(), 
    error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

   deleteReservation(Id: number)
  {
    this.reservationService.deleteReservation(Id).subscribe(
      e => this.reservationService.getAllReservations(), 
      error => { console.log(error), alert("Unsuccessful fetch operation")});
  }

  showCountry(id : number){
    this.router.navigate(['/home/view_reservation/' + id]);
  }
}
