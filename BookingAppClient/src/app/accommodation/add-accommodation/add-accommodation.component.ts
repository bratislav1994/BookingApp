import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Place } from "app/place/place.model";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { AccommodationService } from "app/accommodation/accommodation.service"
import { PlaceService } from "app/place/place.service"
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationService, PlaceService, TypeServiceService]
})
export class AddAccommodationComponent implements OnInit {

  Name: string;
  Description: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  ImageUrl: string;
  places: Place[];
  accommodationTypes: AccommodationType[];
  PlaceId: number;
  AccommodationTypeId: number;

  constructor(private accommodationService: AccommodationService, private placeService: PlaceService,
              private typeService: PlaceService) {
                  this.places = [];
                  this.accommodationTypes = [];
             }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe(p => this.places = p, error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
    this.accommodationService.getAllAccommodations().subscribe(t => this.accommodationTypes = t, error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  onSubmit(form: NgForm){
    this.accommodationService.addAccommodation(new Accommodation(0, this.Name, this.Description, 
                                              this.Address, 1, this.Latitude, this.Longitude,
                                              this.ImageUrl, false, this.PlaceId, 
                                              this.AccommodationTypeId, 0)).subscribe();
    form.reset();
    // this.Name = "";
    // this.Description = "";
    // this.Address = "";
    // this.Latitude = 0;
    // this.Longitude = 0;
    // this.ImageUrl = "";
  }
}
