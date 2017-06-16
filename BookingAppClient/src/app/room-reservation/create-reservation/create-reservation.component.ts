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
    this.reservationService.createReservation(new RoomReservation(0, this.StartDate, this.EndDate, +userId, this.RoomId)).subscribe(
     r => 
        {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Room reservation successfully added.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);   
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
}
