import { Component, OnInit } from '@angular/core';
import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";
import { RegionService } from "app/region/region.service"
import { CountryService } from "app/country/country.service";

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [RegionService, CountryService]
})
export class AddRegionComponent implements OnInit {

  Name: string;
  countries: Country[];
  CountryId: number;

  constructor(private regionService: RegionService, private countryService: CountryService) { 
    this.countries = [];
  }

  ngOnInit() {
      this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error => 
      {
        console.log(error), alert("Unsuccessful fetch operation")
      });
  }

  onSubmit(){
    this.regionService.addRegion(new Region(0, this.Name, this.CountryId)).subscribe(
      x => 
      {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Region successfully added.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
      },
     error => 
     {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Region already exists.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
     });
     
    this.Name = "";
  }

}
