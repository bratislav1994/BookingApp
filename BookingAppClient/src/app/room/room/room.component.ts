import { Component, OnInit, Input } from '@angular/core';
import { Room } from "app/room/Room.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RoomService } from "app/room/room.service";
import 'rxjs/Rx';
import { RoomReservation } from "app/room-reservation/reservation.model";
import { ReservationService} from "app/room-reservation/reservation.service";
import { LocalEnum } from "app/localEnum.model";

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
  AccommodationName: string;

   StartDate: Date;
   EndDate: Date;
   Booking: boolean;
  constructor(private roomService: RoomService, 
              private ruter: Router, 
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
        this.AccommodationName = this.room.Accommodation.Name;
        console.log(this.RoomNumber);
    }, error => console.log(error));
    this.Booking = false;
  }

  onSubmit()
  {
    if(this.RoomNumber == undefined || this.BedCount == undefined ||
         this.PricePerNight == undefined || this.AccommodationId == undefined)
         {
                var doc = document.getElementById("errorMsg");
                doc.innerText = "Some required fields are empty.";   
                doc.className = "show";
                setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
         }
         else
         {
                this.roomService.editRoom(new Room(this.Id,
                                       this.RoomNumber, 
                                       this.BedCount,
                                       this.Description,
                                       this.PricePerNight,
                                       this.AccommodationId)).subscribe(
                  x => 
                  {
                        var doc = document.getElementById("successMsg");
                        doc.innerText = "Room successfully edited.";   
                        doc.className = "show";
                        setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
                        this.ruter.navigate(['/view_rooms/' + this.AccommodationId + '/' + +localStorage.getItem(LocalEnum.Id.toString())]);
                  },
                  error =>
                  {
                        var doc = document.getElementById("errorMsg");
                        doc.innerText = error.json().Message;   
                        doc.className = "show";
                        setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
                  });
         }
        
  }

  getReservations() : void{
    this.reservationService.getAllReservations().subscribe(p => this.roomReservations = p.json(), error => 
     {
        console.log(error);
     });
  }

  showReservation(id : number){
    this.ruter.navigate(['/home/view_reservation/' + id]);
  }

}
