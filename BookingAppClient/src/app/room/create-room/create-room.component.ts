import { Component, OnInit } from '@angular/core';
import { Room } from "app/room/Room.model";
import { RoomService } from "app/room/room.service";
import { AccommodationService } from 'app/accommodation/accommodation.service';
import { Accommodation } from 'app/accommodation/accommodation.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
  providers: [RoomService, AccommodationService]
})
export class CreateRoomComponent implements OnInit {

    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;
    AccommodationId: number;
    accommodations: Accommodation[];
    
  constructor(private roomService: RoomService,
              private accommodationService: AccommodationService) { 
    this.accommodations = [];
  }

  ngOnInit() {
    this.accommodationService.getAllAccommodations().subscribe(a => this.accommodations = a.json(), 
        error => 
        {
            console.log("Aaa" + error), alert("AAA");
        });
  }

  onSubmit(){
    this.roomService.createRoom(new Room(0,
                                        this.RoomNumber, 
                                         this.BedCount, 
                                         this.Description, 
                                         this.PricePerNight, 
                                         this.AccommodationId )).subscribe(
        r => 
        {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Room successfully added.";   
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
