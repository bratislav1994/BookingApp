import { Component, OnInit } from '@angular/core';
import { PlaceService } from "app/place/place.service";
import { Place } from "app/place/Place.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-places',
  templateUrl: './list-of-places.component.html',
  styleUrls: ['./list-of-places.component.css'],
  providers: [PlaceService]
})
export class ListOfPlacesComponent implements OnInit {

  places: Place[];

  constructor(private placeService : PlaceService, private route : Router) {
    this.places = [];
  }

  ngOnInit() {
    this.getPlaces();
  }

  deletePlace(place: Place)
  {
    this.placeService.deletePlace(place.Id).subscribe(e => this.getPlaces());
  }

  getPlaces() : void{
    this.placeService.getAllPlaces().subscribe(p => this.places = p.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showPlace(id : number){
    this.route.navigate(['/home/view_place/' + id]);
  }

}
