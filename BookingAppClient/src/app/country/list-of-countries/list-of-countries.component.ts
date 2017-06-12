import { Component, OnInit } from '@angular/core';
import { CountryService } from "app/country/country.service";
import { Country } from "app/country/Country.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.css'],
  providers: [CountryService]
})

export class ListOfCountriesComponent implements OnInit {

  countries: Country [];

  constructor(private countryService : CountryService, private route : Router) {
      this.countries = [];
   }

  ngOnInit() {
    this.getCountries();
  }

  deleteCountry(country: Country)
  {
    this.countryService.deleteCountry(country.Id).subscribe(e => this.getCountries());
  }

  getCountries() : void{
    this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showCountry(id : number){
    this.route.navigate(['/home/view_country/' + id]);
  }
}