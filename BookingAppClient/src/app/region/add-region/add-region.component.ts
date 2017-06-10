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
      this.countryService.getAllCountries().subscribe(c => this.countries = c, error => 
      {
        console.log(error), alert("Unsuccessful fetch operation")
      });
  }

  onSubmit(){
    this.regionService.addRegion(new Region(1, this.Name, this.CountryId)).subscribe();
    this.Name = "";
  }

}
