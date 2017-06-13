import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/Country.model";
import { CountryService } from "app/country/country.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
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
  toastrOptions: ToastOptions;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig,
            private countryService : CountryService) {
              this.toastyConfig.theme = 'bootstrap';
    }

  ngOnInit() {
  }

  onSubmit()
  {
    this.countryService.addCountry(new Country(0, this.Name, this.Code)).subscribe(x => 
                 {     var toastOptions:ToastOptions = {
            title: "",
            msg: "Country successfully added",
            showClose: true,
            timeout: 5000,
            theme: "bootstrap",
        }
        // Add see all possible types in one sho
        this.toastyService.success(toastOptions);
                 },
     error => 
     {
        console.log(error), alert(error.text())
     });
    this.Name = "";
    this.Code = "";
  }

}
