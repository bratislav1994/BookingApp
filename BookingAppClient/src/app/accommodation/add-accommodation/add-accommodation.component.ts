import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Place } from "app/place/place.model";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { AccommodationService } from "app/accommodation/accommodation.service"
import { PlaceService } from "app/place/place.service"
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { NgForm } from '@angular/forms';
import { Region } from "app/region/region.model";
import { Country }  from "app/country/country.model";
import { CountryService } from "app/country/country.service";
import { RegionService } from "app/region/region.service";

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationService, TypeServiceService, PlaceService, RegionService, CountryService]
})
export class AddAccommodationComponent implements OnInit {

    file: File;

    Id: number;
    Name: string;
    Description: string;
    Address: string;
    AvrageGrade: number;
    Latitude: number;
    Longitude: number;
    ImageUrl: string;
    Approved: boolean;
    PlaceId: number;
    AccommodationTypeId: number;
    UserId: number;
    Place: Place;
    AccommodationType: AccommodationType;

    Region: Region;
    RegionId: number;
    Country: Country;
    CountryId: number;

    types: AccommodationType[];
    places: Place[];
    countries: Country[];
    regions: Region[];

  constructor(private accommodationService: AccommodationService, private placeService: PlaceService,
              private countryService: CountryService, private typeService: TypeServiceService,
               private regionService : RegionService) {
                  this.places = [];
                  this.types = [];
                  this.regions = [];
                  this.countries = [];
             }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe(p => this.places = p.json(), error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
    this.accommodationService.getAllAccommodations().subscribe(t => this.types = t.json(), error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
    this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error =>
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
    this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error =>
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });

    this.Place = null;
    this.Country = null;
    this.Region = null;
    this.AccommodationType = null;
  }

  onSubmit(form: NgForm){
    // this.accommodationService.addAccommodation(new Accommodation(0, this.Name, this.Description, 
    //                                           this.Address, 1, this.Latitude, this.Longitude,
    //                                           this.ImageUrl, false, this.PlaceId, 
    //                                           this.AccommodationTypeId, 0)).subscribe();
    
    this.Name = "";
    this.Description = "";
    this.Address = "";
    this.Latitude = 0;
    this.Longitude = 0;
    this.ImageUrl = "";
  }

   countrySelected()
  {
    this.countryService.getCountryByIdMap(this.CountryId).subscribe(
      c => {
        this.Country = c[0] as Country; 
       // this.regions = this.Country.Regions;
      });
  }

  regionSelected()
  {
    this.regionService.getRegionByIdMap(this.RegionId).subscribe(
      r => {
        this.Region = r[0] as Region; 
        this.places = this.Region.Places;
      });
  }

  placeSelected()
  {
    this.placeService.getPlaceByIdMap(this.PlaceId).subscribe(
      p => {
            this.Place = p[0] as Place;
      }
    );
  }

  isSelectedCountry() : boolean
  {
    return this.Country != null;
  }

  isSelectedRegion() : boolean
  {
    return this.Region != null;
  }

  onChange(event: EventTarget) {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      let files: FileList = target.files;
      this.file = files[0];
    }
}
