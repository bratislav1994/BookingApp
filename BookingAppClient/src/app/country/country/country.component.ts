import { Component, OnInit, Input } from '@angular/core';
import {Country} from "app/country/Country.model";
import {Region} from "app/region/Region.model";
import { CountryService } from "app/country/country.service"
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';
import { RegionService } from "app/region/region.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService, RegionService]
})

export class CountryComponent implements OnInit {
  
  country: Country;
  Name : string;
  Code: string;
  regions: Region[];

  constructor(private countryService : CountryService, private route: Router, private activatedRoute: ActivatedRoute,
            private regionService: RegionService) {
    this.country = new Country(0, "", "");
    this.regions = [];
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.countryService.getCountryByIdMap(id).subscribe(c =>
    {
        this.country = (c[0] as Country);
        console.log(this.country.Name);
        this.Name = this.country.Name;
        this.Code = this.country.Code;
        this.regions = this.country.Regions;
    }, error => alert(error.text()));
  }

  onSubmit()
  {
    if(this.Name == undefined || this.Code == undefined ||
       this.Name == "" || this.Code == "")
    {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Some required fields are empty.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
    }
    else 
    {
        this.countryService.editCountry(new Country(this.country.Id, this.Name, this.Code)).subscribe(
          x => 
          {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Country successfully edited.";   
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
  }

  deleteRegion(region: Region)
  {
    this.regionService.deleteRegion(region.Id).subscribe(
      e => 
      {
            this.getRegions();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Region successfully deleted.";   
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

  getRegions() : void{
    this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error => 
     {
        alert("Unable to get regions.")
     });
  }

   showRegion(id : number){
    this.route.navigate(['/view_region/' + id]);
  }

}