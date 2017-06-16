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
    this.countryService.deleteCountry(country.Id).subscribe(
      e => 
      {
            this.getCountries();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Country successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = error.json().Message;  
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
        );
  }

  getCountries() : void{
    this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error => 
     {
        console.log(error), alert("Unable to get countries.")
     });
  }

  showCountry(id : number){
    this.route.navigate(['/home/view_country/' + id]);
  }
}