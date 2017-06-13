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
    // this.activatedRoute.params.subscribe(params => { this.countryService.getCountryByIdMap(+params['Id']).
    //                                       map(r => r.json()).subscribe(c => {this.country = c as Country
    // })});
    //l id;
    let id = this.activatedRoute.snapshot.params["Id"];
    this.countryService.getCountryByIdMap(id).subscribe(c =>
    {
      this.country = (c[0] as Country);
      //if(!this.country.Name){
        console.log(this.country.Name);
        this.Name = this.country.Name;
        this.Code = this.country.Code;
        this.regions = this.country.Regions;
      //}
    }, error => console.log(error));
    // this.activatedRoute.snapshot.params.subscribe(params => {
    //   id = parseInt(params["Id"]);
    //   this.getCountry(id);
    // });   
    
  }

  onSubmit()
  {
    this.countryService.editCountry(new Country(this.country.Id, this.Name, this.Code)).subscribe();
    console.log("edited");
  }

  deleteRegion(region: Region)
  {
    this.regionService.deleteRegion(region.Id).subscribe(e => this.getRegions());
  }

  getRegions() : void{
    this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

   showRegion(id : number){
    this.route.navigate(['/home/view_region/' + id]);
  }

}