import { Component, OnInit, Input } from '@angular/core';
import { Room } from "app/room/Room.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RoomService } from "app/room/room.service";
import 'rxjs/Rx';
import { RoomReservation } from "app/room-reservation/reservation.model";
import { ReservationService} from "app/room-reservation/reservation.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {

  room: Room;
  RoomNumber: number;
  BedCount: number;
  Description: string;
  PricePerNight: number;
  AccommodationId: number;
  roomReservations: RoomReservation[];

  constructor(private roomService: RoomService, private roter: Router, private activatedRouter: ActivatedRoute) 
  {
    this.room = new Room(0, 0, "", 0, 0);
   }

  ngOnInit() {
   let id = this.activatedRouter.snapshot.params["Id"];
    this.roomService.getRoomByIdMap(id).subscribe(p => 
    {
      this.room = (p[0] as Room);
        this.AccommodationId = this.room.Accommodation.Id;
        this.RoomNumber = this.room.RoomNumber;
        this.BedCount = this.room.BedCount;
        this.Description = this.room.Description;
        this.PricePerNight = this.room.PricePerNight;
    }, error => console.log(error));
  }

}
