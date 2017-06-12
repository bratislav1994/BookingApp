import { Component, OnInit, Input } from '@angular/core';
import { Room } from "app/room/Room.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RoomService } from "app/room/room.service";
import 'rxjs/Rx';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {

  room: Room;
  
  constructor(private roomService: RoomService, private roter: Router, private activatedRouter: ActivatedRoute) 
  {
    this.room = new Room(0, 0, "", 0, 0);
   }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.params["Id"];
    this.roomService.getRoomByIdMap(id).subscribe(p => 
    {
        this.room = (p as Room);
    }, error => console.log(error));
  }

}
