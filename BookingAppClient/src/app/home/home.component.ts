import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "app/local-storage.service";
import { LocalEnum } from "app/localEnum.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Router } from '@angular/router';
import { DynamicUrl } from "app/DynamicUrl.model";
import { Accommodation } from "app/accommodation/Accommodation.model";
import { AccommodationType } from "app/accommodation-type/type.model";
import { Room } from "app/room/room.model";
import { PaginationService } from "app/pagination/pagination.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService, AccommodationService, PaginationService]
})
export class HomeComponent implements OnInit {
   username: string;
   accommodations: Accommodation[];
   pageNumber : number = 1;
   currentCounterOfPages : Array<number>;
   showPagesMax: number = 2;
   selectedOdd: boolean = true;

  constructor(private storageService: LocalStorageService, private accommodationService : AccommodationService, 
              private route : Router, private paginationService: PaginationService) { 
    this.accommodations = [];
  }
    
  ngOnInit() {
      this.getAccommodations();
  }

  onClick(id : number)
  {
      this.route.navigate(['/view_accommodation/', id]);
  }
  
  IsLoggedIn() : boolean {

    this.username = localStorage.getItem(LocalEnum.Username.toString());
    return this.storageService.IsLoggedIn();
  }

  isAdmin() : boolean {
    return this.storageService.isAdmin();
  }

  isManager() : boolean {
    return this.storageService.isManager();
  }

  isUser() : boolean {
    return this.storageService.isUser();
  }

  getAccommodations() : void {
     this.accommodationService.getAllAccommodationsWithQueryOData(this.pageNumber, PaginationService.pageSize, "&$filter=Approved eq true").subscribe(
       a => {
          this.accommodations = a.json().value;
          this.paginationService.calculateNumberOfPages(a);
          this.howManyPagesAre();
          this.appendPortToImageUrl();
      });
  }

  appendPortToImageUrl()
  {
    for (var i = 0; i < this.accommodations.length; i++) {
        this.accommodations[i].ImageUrl = DynamicUrl.socket + this.accommodations[i].ImageUrl;
    }
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
    this.accommodationService.getAllAccommodationsWithQueryOData(page, PaginationService.pageSize, "&$filter=Approved eq true").subscribe(
      a => 
      {
        this.accommodations = (a.json()).value;
        this.paginationService.calculateNumberOfPages(a);
        this.appendPortToImageUrl();
      }
    );
  }

}
