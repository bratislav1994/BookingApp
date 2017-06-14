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
  AvrageGrade: number;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;
  AccommodationTypeName: string;
  PlaceName: string;
  RegionName: string;
  CountryName: string;
  
  query: string;   

  constructor(private accommodationService : AccommodationService) {
    this.accommodations = [];
    this.resetFields();
    this.query = "";
  }

  ngOnInit() {
  }

  resetFields()
  {
      this.Name = "";
      this.CountryName = "";
      this.RegionName = "";
      this.PlaceName = "";
      this.AccommodationTypeName = "";
      this.AvrageGrade = undefined;
      this.MinPrice = undefined;
      this.MaxPrice = undefined;
      this.BedCount = undefined;
  }

  search()
  {
    if(this.Name == "" && this.AvrageGrade == undefined && this.BedCount == undefined && this.MinPrice == undefined &&
       this.MaxPrice == undefined && this.CountryName == "" && this.RegionName == "" && this.PlaceName == "" && 
       this.AccommodationTypeName == ""){
          this.searchAll();
    }
    else
    {
        this.resetFields();

        this.accommodationService.getByFilter(this.query).subscribe(
        a => 
        { 
          this.accommodations = a;
        },
        error =>
        {
            console.log("sfs");
        }
      );
    }
  }

  expandFilters()
  {
    this.query = "?$filter=";

    if(this.Name != "")
    {
      this.query += `Name eq '${this.Name}' and `;
    }

    if(this.BedCount != undefined)
    {
      this.query += `Rooms/any(room : room/BedCount eq ${this.BedCount}) and `;
    }

    if(this.MinPrice != undefined)
    {
      this.query += `Rooms/any(room : room/PricePerNight ge ${this.MinPrice}) and `;
    }

    if(this.MaxPrice != undefined)
    {
      this.query += `Rooms/any(room : room/PricePerNight le ${this.MaxPrice}) and `;
    }

    if(this.AvrageGrade != undefined)
    {
      this.query += `AvrageGrade ge ${this.AvrageGrade} and `;
    }

    if(this.CountryName != ""){
      this.query += `Place/Region/Country/Name eq '${this.CountryName}' and `;
    }

    if(this.RegionName != ""){
      this.query += `Place/Region/Name eq '${this.RegionName}' and `;
    }

    if(this.PlaceName != ""){
      this.query += `Place/Name eq '${this.PlaceName}' and `;
    }

    if(this.AccommodationTypeName != ""){
      this.query += `AccommodationType/Name eq '${this.AccommodationTypeName}' and `;
    }

    this.query = this.query.substr(0, this.query.lastIndexOf('and '));
    this.query += `&$expand=Place,AccommodationType`;
  }

  searchAll()
  {
      this.accommodationService.getAllAccommodations().subscribe(
      a => 
      { 
        this.accommodations = a.json();
      },
      error =>
      {
          console.log("opaaa");
      }
    );
  }

}
