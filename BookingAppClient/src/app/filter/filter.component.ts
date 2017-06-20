import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Accommodation } from "app/accommodation/accommodation.model";
import { DynamicUrl } from "app/DynamicUrl.model";
import { PaginationService } from "app/pagination/pagination.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [AccommodationService, PaginationService]
})
export class FilterComponent implements OnInit {

  accommodations : Accommodation[];
  pageNumber : number = 1;
  currentCounterOfPages : Array<number>;
  showPagesMax: number = 2;
  selectedOdd: boolean = true;
  FirstSearch: boolean = false;

  Name: string;
  MinAvrageGrade: number;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;
  AccommodationTypeName: string;
  PlaceName: string;
  RegionName: string;
  CountryName: string;
  query: string; 

  constructor(private accommodationService : AccommodationService, private paginationService: PaginationService,
              private route : Router) {
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
      this.MinAvrageGrade = undefined;
      this.MinPrice = undefined;
      this.MaxPrice = undefined;
      this.BedCount = undefined;
  }

  onClick(id : number)
  {
      this.route.navigate(['/view_accommodation/', id]);
  }

  search()
  {
    this.FirstSearch = true;
    this.selectedOdd = true;

    if(this.Name == "" && this.MinAvrageGrade == undefined && this.BedCount == undefined && this.MinPrice == undefined &&
       this.MaxPrice == undefined && this.CountryName == "" && this.RegionName == "" && this.PlaceName == "" && 
       this.AccommodationTypeName == ""){
          this.searchAll();
    }
    else
    {
        this.expandFilters();
        this.resetFields();
        this.pageNumber = 1;
       
        this.accommodationService.getAllAccommodationsWithQueryOData(1, PaginationService.pageSize, this.query).subscribe(
        a => {
          this.accommodations = a.json().value;
          console.log(this.accommodations.length);
          
          this.paginationService.calculateNumberOfPages(a);
          this.howManyPagesAre();
          this.appendPortToImageUrl();
      });
         
  }
  }

  getAllWithQuery(page: number) {
    this.accommodationService.getAllAccommodationsWithQueryOData(page, PaginationService.pageSize, this.query).subscribe(
        a => {
          this.accommodations = a.json().value;
          console.log(this.accommodations.length);
          this.paginationService.calculateNumberOfPages(a);
          this.appendPortToImageUrl();
      },
      error => 
      {
        console.log("with: " + error.json().Message);
      }
      );
  }

  appendPortToImageUrl()
  {
    for (var i = 0; i < this.accommodations.length; i++) {
        this.accommodations[i].ImageUrl = DynamicUrl.socket + this.accommodations[i].ImageUrl;
    }
  }

  expandFilters()
  {
    this.query = "&$filter=Approved eq true and ";

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

    if(this.MinAvrageGrade != undefined)
    {
      this.query += `AvrageGrade ge ${this.MinAvrageGrade} and `;
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
      this.FirstSearch = true;
      this.selectedOdd = true;
      this.resetFields();
     this.query = "&$filter=Approved eq true";
      this.howManyPagesAre();
      this.getAllWithQuery(1);
  }

  howManyPagesAre() {
    this.currentCounterOfPages = this.pageNumber * this.showPagesMax > PaginationService.numberOfPages ? new Array(this.showPagesMax - 1) : new Array(this.showPagesMax);
  }

  enableNext(){
    return (this.pageNumber * this.showPagesMax) < PaginationService.numberOfPages;
  }

  enablePrevious(){
    return this.pageNumber > 1;
  }

  nextPage(){
    this.pageNumber += 1;
    this.howManyPagesAre();
    this.ChangePage(this.pageNumber * this.showPagesMax - 1);
    this.selectedOdd = true;
  }

  previousPage(){
    this.pageNumber -= 1;
    this.howManyPagesAre();
    this.ChangePage(this.pageNumber * this.showPagesMax);
    this.selectedOdd = false;
  }

  ifFirstOrSecondSelected() {
    return this.selectedOdd;
  }

  ChangePage(page : number){
    this.selectedOdd = page % 2 == 0 ? false : true;
    this.getAllWithQuery(page);
  }


}
