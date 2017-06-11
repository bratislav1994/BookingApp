import { Component, OnInit, Input } from '@angular/core';
import {Country} from "app/country/Country.model";
import { CountryService } from "app/country/country.service"

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})

export class CountryComponent implements OnInit {
  
  @Input () country: Country;

  constructor(private countryService : CountryService) {
   }

  ngOnInit() {
  }

  deleteCountry()
  {
    this.countryService.deleteCountry(this.country.Id).subscribe();
  }

}