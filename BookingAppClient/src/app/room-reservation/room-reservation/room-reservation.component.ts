import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';
import { ReservationService } from "app/room-reservation/reservation.service";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css'],
  providers: [ReservationService]
})
export class RoomReservationComponent implements OnInit {
 
  reservation: RoomReservation;
  StartDate: Date;
  EndDate: Date;
  reservationId: number;
  UserId: number;
  RoomId: number;
  constructor(private reservationService: ReservationService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.reservationService.getReservationByIdMap(id).subscribe(r =>
    {
      this.reservation = (r as RoomReservation);
      this.StartDate = this.reservation.StartDate;
      this.EndDate = this.reservation.EndDate;
      this.reservationId =this.reservation.Id;
      this.UserId = this.reservation.UserId;
      this.RoomId = this.reservation.RoomId;

    }, error => console.log(error));
  }

  onSubmit()
  {
    this.reservationService.editReservation(new RoomReservation(this.reservationId,
                                       this.StartDate, 
                                       this.EndDate,
                                       this.UserId,
                                       this.RoomId)).subscribe(
      x => 
      {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Reservation successfully edited.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Error during editing reservation.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }
}
