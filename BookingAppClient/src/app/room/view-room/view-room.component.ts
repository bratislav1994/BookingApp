import { Component, OnInit } from '@angular/core';
import { RoomService } from "app/room/room.service";
import { Room } from "app/room/Room.model";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalEnum } from "app/localEnum.model";

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
  providers: [RoomService]
})
export class ViewRoomComponent implements OnInit {

  rooms: Room[];
  Id: number;
  managerId: number;
  constructor(private roomService : RoomService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.rooms = [];
  }

  ngOnInit() {
    this.Id = this.activatedRoute.snapshot.params["Id"]; // accommodationId
    this.managerId = this.activatedRoute.snapshot.params["Id2"];
    this.getRooms();
  }

  canDelete() : boolean {
    return this.managerId == +localStorage.getItem(LocalEnum.Id.toString());
  }

  showRoom(id: number){
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

}
