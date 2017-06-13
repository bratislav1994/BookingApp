import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/Country.model";
import { CountryService } from "app/country/country.service";
import {Subject, Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [CountryService]
})
export class AddCountryComponent implements OnInit {

  Name : string;
  Code : string;

  constructor(private countryService : CountryService) {
    }

  ngOnInit() {
  }

  onSubmit()
  {
    this.countryService.addCountry(new Country(0, this.Name, this.Code)).subscribe(x => 
    {    
            var doc = document.getElementById("successMsg");
            doc.innerText = "Country successfully added.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
    },
     error => 
     {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Country already exists.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
     });
    this.Name = "";
    this.Code = "";
  }

}
