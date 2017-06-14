import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Accommodation } from "app/accommodation/accommodation.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [AccommodationService]
})
export class FilterComponent implements OnInit {

  accommodations : Accommodation[];
  
  Name: string;
  
  query: string;   

  constructor(private accommodationService : AccommodationService) {
    this.accommodations = [];
    this.Name = "";
    this.query = "";
  }

  ngOnInit() {
  }

  search()
  {
    this.query = "?$filter=";

    if (this.Name != "")
    {
      this.query += `Name eq '${this.Name}' and `;
    }

    this.query = this.query.substr(0, this.query.lastIndexOf('and '));

    this.accommodationService.getByFilter(this.query).subscribe(
      a => 
      { 
        this.accommodations = a;
      },
      error =>
      {

      }
    );


  }

  searchAll()
  {

  }

}
