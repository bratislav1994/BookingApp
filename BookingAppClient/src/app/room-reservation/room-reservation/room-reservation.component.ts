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
  constructor(private reservationService: ReservationService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.reservationService.getReservationByIdMap(id).subscribe(r =>
    {
      this.reservation = (r[0] as RoomReservation);
    }, error => console.log(error));
  }

}
