import { Component, OnInit } from '@angular/core';
import { PlaceService } from "app/place/place.service";
import { RegionService } from "app/region/region.service";
import { CountryService } from "app/country/country.service";
import { Region } from "app/region/region.model";
import { Place } from "app/place/place.model";

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [PlaceService, RegionService, CountryService]
})
export class AddPlaceComponent implements OnInit {

  regions : Region[];
  Name : string;
  RegionId : number;

  constructor(private placeService: PlaceService, private regionService : RegionService, private countryService: CountryService) {
    this.regions = [];
   }

  ngOnInit() {
     this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  onSubmit(){
    this.placeService.addPlace(new Place(0, this.Name, this.RegionId)).subscribe(x => 
                                                                              alert("Place successfully added"),
     error => 
     {
        console.log(error), alert(error.text())
     });
    this.Name = "";
  }

}
