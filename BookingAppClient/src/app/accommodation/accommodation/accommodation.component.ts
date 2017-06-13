import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Room } from "app/room/room.model";
import { AccommodationService } from "app/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService]
})

export class AccommodationComponent implements OnInit {

  accommodation: Accommodation;
  rooms: Room[];

  constructor(private accommodationService : AccommodationService, private route: Router, 
                private activatedRoute: ActivatedRoute) { 
    this.accommodation = new Accommodation();
    this.rooms = [];
  }

  ngOnInit() {
    this.rooms = [];
    let id = this.activatedRoute.snapshot.params["Id"];
    this.accommodationService.getByIdMap(id).subscribe(a =>
    {
        this.accommodation = (a[0] as Accommodation);
        console.log(this.accommodation.Name);
        this.rooms = this.accommodation.Rooms;
    }, error => console.log("aaaaaaaaaaaaaa" + error.text()));
  }

}
