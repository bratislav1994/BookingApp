import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "app/local-storage.service";
import { LocalEnum } from "app/localEnum.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Router } from '@angular/router';
import { DynamicUrl } from "app/DynamicUrl.model";
import { Accommodation } from "app/accommodation/Accommodation.model";
import { AccommodationType } from "app/accommodation-type/type.model";
import { Room } from "app/room/room.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService, AccommodationService]
})
export class HomeComponent implements OnInit {
   username: string;
   accommodations: Accommodation[];
   allAccommodationsView: boolean;

  constructor(private storageService: LocalStorageService, private accommodationService : AccommodationService, 
              private route : Router) { 
    this.accommodations = [];
    this.allAccommodationsView = true;
  }
    
  ngOnInit() {
      this.getAccommodations();
      console.log("usaooooooooooooooo");
  }

  getAccommodations() : void{
    this.accommodationService.getAllAccommodations().subscribe(a =>
    { 
      this.accommodations = a.json();
      this.appendPortToImageUrl();
  },
    error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  appendPortToImageUrl()
  {
    for (var i = 0; i < this.accommodations.length; i++) {
        this.accommodations[i].ImageUrl = DynamicUrl.socket + this.accommodations[i].ImageUrl;
    }
  }

  onClick(id : number)
  {
      this.route.navigate(['/home/view_accommodation/', id]);
      this.allAccommodationsView = false;
  }

  isAllView() : boolean {
    return this.allAccommodationsView;
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
}
