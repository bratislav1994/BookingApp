import { Component, OnInit } from '@angular/core';
import {Country} from './conutry.model'
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

countries : Country[];

  constructor() {
    this.countries = [
      new Country(1, "Srbija", "SRB"),
       new Country(2, "Italija", "ITY")
    ];
   }

  ngOnInit() {
  }

}
