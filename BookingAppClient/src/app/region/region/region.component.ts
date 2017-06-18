import { Component, OnInit, Input } from '@angular/core';
import { Region } from "app/region/region.model";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';
import { RegionService } from "app/region/region.service";
import { Place } from 'app/place/place.model';
import { PlaceService } from "app/place/place.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService, PlaceService]
})
export class RegionComponent implements OnInit {
  
  region: Region;
  Name : string;
  countryName: string;
  places: Place[];

  constructor(private regionService : RegionService, private route: Router, private activatedRoute: ActivatedRoute, 
              private placeService: PlaceService) {
    this.region = new Region();
    this.places = [];
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.regionService.getRegionByIdMap(id).subscribe(r =>
    {
      this.region = (r[0] as Region);
        console.log(this.region.Name);
        this.countryName = this.region.Country.Name;
        this.Name = this.region.Name;
        this.places = this.region.Places;
    }, error => console.log(error));
  }

  onSubmit()
  {
    if(this.Name == "" || this.Name == undefined)
    {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Some required fields are empty.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
    }
    else 
    {
          this.regionService.editRegion(new Region(this.region.Id, this.Name, this.region.CountryId)).subscribe(
      x => 
      {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Region successfully edited.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = error.json().Message;   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      });
    }

    this.Name = undefined;
    
  }

  deletePlace(place: Place)
  {
    this.placeService.deletePlace(place.Id).subscribe(
      e => 
      {
          this.getPlaces();  
          var doc = document.getElementById("successMsg");
          doc.innerText = "Place successfully deleted.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      },
      error => 
      {
          var doc = document.getElementById("errorMsg");
          doc.innerText = "Error while deleting region.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      }
    );
  }

  getPlaces() : void{
    this.placeService.getAllPlaces().subscribe(p => this.places = p.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showPlace(id : number){
    this.route.navigate(['/view_place/' + id]);
  }

}
