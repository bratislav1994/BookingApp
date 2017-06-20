import { Component, OnInit } from '@angular/core';
import { RoomService } from "app/room/room.service";
import { Room } from "app/room/Room.model";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalEnum } from "app/localEnum.model";
import { LocalStorageService } from "app/local-storage.service";
import { NgForm } from '@angular/forms';
import { RoomReservation } from "app/room-reservation/reservation.model";
import { ReservationService } from "app/room-reservation/reservation.service";

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
  providers: [RoomService, LocalStorageService, ReservationService]
})
export class ViewRoomComponent implements OnInit {

  rooms: Room[];
  Id: number;
  managerId: number;
  roomId: number;

  constructor(private roomService : RoomService, private router: Router, private activatedRoute: ActivatedRoute, 
            private localStorageService: LocalStorageService, private reservationService: ReservationService) { 
    this.rooms = [];
  }

  ngOnInit() {
    this.Id = this.activatedRoute.snapshot.params["Id"]; // accommodationId
    this.managerId = this.activatedRoute.snapshot.params["Id2"];
    this.getRooms();
  }

  canEditOrDelete() : boolean {
    return this.managerId == +localStorage.getItem(LocalEnum.Id.toString());
  }

  isUser() : boolean {
    return this.localStorageService.IsLoggedIn() && this.localStorageService.isUser();
  }

  editRoom(id: number){
      this.router.navigate(['/view_room/' + id]);
  }

  deleteRoom(id: number){
    this.roomService.deleteRoom(id).subscribe(
      e => 
      {
          this.getRooms();
          var doc = document.getElementById("successMsg");
          doc.innerText = "Room successfully deleted.";   
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

  getRooms() : void{
    this.roomService.getRoomsByIdMap(this.Id).subscribe(
      r => { this.rooms = r; console.log(this.rooms.length)}, 
      error => {
        console.log(error), alert("Unsuccessful fetch operation");
      });
  }

  bookRoom(roomRes: RoomReservation, form: NgForm) {
    let userId = localStorage.getItem(LocalEnum.Id.toString());
    if(roomRes.StartDate == undefined || roomRes.EndDate == undefined || +userId == undefined || this.roomId == undefined)
    {
        alert("Some required fields are empty.");
    }
    else 
    {
        this.reservationService.createReservation(new RoomReservation(0, roomRes.StartDate, roomRes.EndDate, +userId, this.roomId, false)).subscribe(
          r => 
          {
              var doc = document.getElementById("successMsg");
              doc.innerText = "Room reservation successfully added.";   
              doc.className = "show";
              setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
              document.getElementById("close4").click();
          },
          error => 
          {
              var doc = document.getElementById("errorMsg");
              doc.innerText = error.json().Message;   
              doc.className = "show";
              setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
              document.getElementById("close4").click();
          });
    }
  }

  catchRoom(id: number) {
    this.roomId = id;
    document.getElementById("openModalButton").click();
  }

}
