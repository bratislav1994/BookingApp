import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/Country.model";
import { CountryService } from "app/country/country.service";

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [CountryService]
})
export class AddCountryComponent implements OnInit {

  Name : string;
  Code : string;

  constructor(private countryService : CountryService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.countryService.addCountry(new Country(0, this.Name, this.Code)).subscribe(x => 
                                                                              alert("Country successfully added"),
     error => 
     {
        console.log(error), alert("Country already exists.")
     });
    this.Name = "";
    this.Code = "";
  }

}
