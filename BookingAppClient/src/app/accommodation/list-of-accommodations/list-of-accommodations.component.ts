import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Accommodation } from "app/accommodation/Accommodation.model";

@Component({
  selector: 'app-list-of-accommodations',
  templateUrl: './list-of-accommodations.component.html',
  styleUrls: ['./list-of-accommodations.component.css'],
  providers: [AccommodationService]
})
export class ListOfAccommodationsComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private accommodationService : AccommodationService) {
    this.accommodations = [];
  }

  ngOnInit() {
    this.accommodationService.getAllAccommodations().subscribe(a => this.accommodations = a);
  }

}
