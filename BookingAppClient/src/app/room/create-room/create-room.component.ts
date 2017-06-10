import { Component, OnInit } from '@angular/core';
import { Room } from "app/room/Room.model";
import { RoomService } from "app/room/room.service"
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
  providers: [RoomService]
})
export class CreateRoomComponent implements OnInit {

    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;

  constructor(private roomService: RoomService) { 

  }

  ngOnInit() {
  }

  onSubmit(){
    this.roomService.createRoom(new Room(this.RoomNumber, this.BedCount, this.Description, this.PricePerNight )).subscribe();
    this.Description = "";
  }
}
