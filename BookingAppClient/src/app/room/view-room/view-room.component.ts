import { Component, OnInit } from '@angular/core';
import { RoomService } from "app/room/room.service";
import { Room } from "app/room/Room.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
  providers: [RoomService]
})
export class ViewRoomComponent implements OnInit {

  rooms: Room[];

  constructor(private roomService : RoomService, private router: Router) { 
    this.rooms = [];
  }

  ngOnInit() {
    this.getRooms();
  }

  showRoom(id: number){
      this.router.navigate(['/home/view_room/' + id]);
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
          doc.innerText = "Error while deleting room.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }

  getRooms() : void{
    this.roomService.getAllRooms().subscribe(
      r => this.rooms = r.json(), 
      error => {
        console.log(error), alert("Unsuccessful fetch operation");
      });
  }
}
