import { Component, OnInit } from '@angular/core';
import { Country } from "app/add-country/Country.model";
import { AddCountryService } from './add-country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [AddCountryService]
})
export class AddCountryComponent implements OnInit {

  Name : string;
  Code : string;

  constructor(private addCountryService : AddCountryService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.addCountryService.addCountry(new Country(this.Name, this.Code)).subscribe();
    this.Name = "";
    this.Code = "";
  }

}
