import { Component, OnInit } from '@angular/core';
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Accommodation } from "app/accommodation/Accommodation.model";
import { Room } from "app/room/room.model";
import { AccommodationType } from "app/accommodation-type/type.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-accommodations',
  templateUrl: './list-of-accommodations.component.html',
  styleUrls: ['./list-of-accommodations.component.css'],
  providers: [AccommodationService]
})
export class ListOfAccommodationsComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private accommodationService : AccommodationService, private route : Router) {
    this.accommodations = [];
  }

  ngOnInit() {
    this.getAccommodations();
  }

  deleteAcc(acc: Accommodation)
  {
    this.accommodationService.delete(acc.Id).subscribe(
      e => 
      {
            this.getAccommodations();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Accommodation successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Error while deleting accommodation.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
        );
  }

   showAcc(id : number){
    this.route.navigate(['/home/view_accommodation/' + id]);
  }

  getAccommodations() : void{
    this.accommodationService.getAllAccommodations().subscribe(a => this.accommodations = a.json(), error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

}
