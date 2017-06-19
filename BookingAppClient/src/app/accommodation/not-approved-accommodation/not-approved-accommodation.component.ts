import { Component, OnInit } from '@angular/core';
import { Accommodation } from 'app/accommodation/accommodation.model';
import { AccommodationService } from 'app/accommodation/accommodation.service';

@Component({
  selector: 'app-not-approved-accommodation',
  templateUrl: './not-approved-accommodation.component.html',
  styleUrls: ['./not-approved-accommodation.component.css'],
  providers: [AccommodationService]
})
export class NotApprovedAccommodationComponent implements OnInit {

  accommodations : Accommodation[];

  constructor(private accommodationService : AccommodationService) {
    this.accommodations = [];
   }

  ngOnInit() {
    this.getNotApprovedAccommodations();
  }

  approveAccommodation(accommodation: Accommodation){
    this.accommodationService.edit(new Accommodation(accommodation.Id, accommodation.Name, 
    accommodation.Description, accommodation.Address, true, 
    accommodation.ImageUrl, accommodation.Latitude, accommodation.Longitude, accommodation.PlaceId, 
    accommodation.AccommodationTypeId, accommodation.UserId)).subscribe(
      x => 
      {
          this.getNotApprovedAccommodations();
          var doc = document.getElementById("successMsg");
          doc.innerText = "Accommodation successfully changed.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
      },
      error =>
      {
          var doc = document.getElementById("errorMsg");
          doc.innerText = error.json().Message;  
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }

  getNotApprovedAccommodations()
  {
      this.accommodationService.getNotApprovedAccommodations().subscribe(
      a => 
      {
        this.accommodations = a.json(); 
        console.log(this.accommodations.length);
      },
      error => 
      {
        console.log(error.json().Message);
      }
    );
  }

}
