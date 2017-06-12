import { Component, OnInit, Input } from '@angular/core';
import {Country} from "app/country/Country.model";
import { CountryService } from "app/country/country.service"
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})

export class CountryComponent implements OnInit {
  
  country: Country;

  constructor(private countryService : CountryService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.country = null;
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => { this.countryService.getCountryByIdMap(+params['Id']).
    //                                       map(r => r.json()).subscribe(c => {this.country = c as Country
    // })});
    var id;
    this.activatedRoute.params.subscribe(params => {
      id = parseInt(params["Id"]);
      this.getCountry(id);
    });   
    
  }

  getCountry(id : number){
    this.countryService.getCountryByIdMap(id).subscribe(c =>
    {
      this.country = (c as Country);
      if(!this.country.Name){
        console.log(this.country.Name);
      }
    }, error => console.log(error));
  }

}