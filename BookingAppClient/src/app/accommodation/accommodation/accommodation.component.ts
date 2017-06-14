import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Room } from "app/room/room.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Map } from "app/map/angular-map.model";
@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService],

})

export class AccommodationComponent implements OnInit {

  title = 'Google maps simple example';
  map: Map

  accommodation: Accommodation;
  rooms: Room[];

  constructor(private accommodationService : AccommodationService, private route: Router, 
                private activatedRoute: ActivatedRoute) { 
    this.accommodation = new Accommodation();
    this.rooms = [];
    this.map = {} as Map;

    
  }

  ngOnInit() {
    this.rooms = [];
    let id = this.activatedRoute.snapshot.params["Id"];
    this.accommodationService.getByIdMap(id).subscribe(a =>
    {
        this.accommodation = (a[0] as Accommodation);
        console.log(this.accommodation.Name);
        this.rooms = this.accommodation.Rooms;
        this.map = new Map(this.accommodation.Latitude, this.accommodation.Longitude, 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    }, error => console.log("aaaaaaaaaaaaaa" + error.text()));

    // this.m = new Map(45.242268, 19.842954, 
    // "assets/ftn.png",
    // "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    
  }

}
