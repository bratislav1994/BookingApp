import { Component, OnInit } from '@angular/core';
import { RoomReservation } from "app/room-reservation/Reservation.model";
import { ReservationService } from "app/room-reservation/reservation.service"
import { RoomService } from "app/room/room.service";
import { Room } from "app/room/room.model";
import { LocalEnum } from "app/localEnum.model";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
  providers: [ReservationService, RoomService]
})
export class CreateReservationComponent implements OnInit {

   StartDate: Date;
   EndDate: Date; 
   //Timestamp: byte;
   RoomId: number;
   rooms: Room[];
  constructor(private reservationService: ReservationService,
              private roomService: RoomService) 
              {
                this.rooms = [];
               }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(c => this.rooms = c.json(), error => 
      {
        console.log(error), alert("Unsuccessful fetch operation")
      });
  }

  onSubmit(){
    let userId = localStorage.getItem(LocalEnum.Id.toString());
    this.reservationService.createReservation(new RoomReservation(0, this.StartDate, this.EndDate, +userId, this.RoomId)).subscribe(x => alert("Region successfully added"),
     error => 
     {
        console.log(error), alert(error.text())
     });
  }
}
