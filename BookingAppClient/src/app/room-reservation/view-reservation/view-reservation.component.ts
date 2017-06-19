import { Component, OnInit } from '@angular/core';
import { ReservationService } from "app/room-reservation/reservation.service";
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { Router } from '@angular/router';
import { LocalEnum } from "app/localEnum.model";
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

   cancelReservation(id: number)
  {
    this.reservationService.deleteReservation(id).subscribe(
       x => 
      {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Room reservation successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
            this.reservations.find(r => r.Id == id).Canceled = true; 
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = error.json().Message;   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
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
