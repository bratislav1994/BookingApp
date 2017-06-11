import { Component, OnInit, Input } from '@angular/core';
import {Country} from "app/country/Country.model";
import { CountryService } from "app/country/country.service"
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})

export class CountryComponent implements OnInit {
  
  @Input () country: Country;

  constructor(private countryService : CountryService, private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.country.Id = parseInt(params["Id"])});
    console.log(this.country.Id);
    this.countryService.getCountryById(this.country.Id);
  }

  deleteCountry()
  {
    this.countryService.deleteCountry(this.country.Id).subscribe();
  }

}