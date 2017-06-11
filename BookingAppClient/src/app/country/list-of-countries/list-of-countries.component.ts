import { Component, OnInit } from '@angular/core';
import { CountryService } from "app/country/country.service";
import { Country } from "app/country/Country.model";

@Component({
  selector: 'app-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.css'],
  providers: [CountryService]
})

export class ListOfCountriesComponent implements OnInit {

  countries: Country [];

  constructor(private countryService : CountryService) {
      this.countries = [];
   }

  ngOnInit() {
    this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  deleteCountry(country: Country)
  {
    this.countryService.deleteCountry(country.Id).subscribe();
    var id = this.countries.indexOf(country);
    this.countries.splice(id, 1);
  }

}