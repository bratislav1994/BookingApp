import { Component, OnInit } from '@angular/core';
import { RoomService } from "app/room/room.service";
import { Room } from "app/room/Room.model";

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css'],
  providers: [RoomService]
})
export class ViewRoomComponent implements OnInit {

  rooms: Room[];

  constructor(private roomService : RoomService) { 
    this.rooms = [];
  }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe();
  }
}
