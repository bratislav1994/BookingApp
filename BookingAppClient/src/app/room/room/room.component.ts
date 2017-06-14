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
  providers: [RoomService, ReservationService]
})

export class RoomComponent implements OnInit {

  room: Room;
  Id: number;
  RoomNumber: number;
  BedCount: number;
  Description: string;
  PricePerNight: number;
  AccommodationId: number;
  roomReservations: RoomReservation[];
  reservations: RoomReservation[];

  constructor(private roomService: RoomService, 
              private roter: Router, 
              private activatedRouter: ActivatedRoute,
              private reservationService: ReservationService) 
  {
    this.room = new Room();
    this.reservations = [];
   }

  ngOnInit() {
   let id = this.activatedRouter.snapshot.params["Id"];
    this.roomService.getRoomByIdMap(id).subscribe(r => 
    {
      this.room = (r as Room);
      this.Id = this.room.Id;
        this.AccommodationId = this.room.Accommodation.Id;
        this.RoomNumber = this.room.RoomNumber;
        this.BedCount = this.room.BedCount;
        this.Description = this.room.Description;
        this.PricePerNight = this.room.PricePerNight;
        this.reservations = this.room.Reservations;
        console.log(this.RoomNumber);
    }, error => console.log(error));
  }

  onSubmit()
  {
    this.roomService.editRoom(new Room(this.Id,
                                        this.RoomNumber, 
                                       this.BedCount,
                                       this.Description,
                                       this.PricePerNight,
                                       this.AccommodationId)).subscribe();
    console.log("edited");
  }

  // deleteReservation(reservation: RoomReservation)
  // {
  //   this.reservationService.deleteReservation(reservation.).subscribe(e => this.getPlaces());
  // }

  getReservations() : void{
    this.reservationService.getAllReservations().subscribe(p => this.roomReservations = p.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showReservation(id : number){
    this.roter.navigate(['/home/view_reservation/' + id]);
  }

}
