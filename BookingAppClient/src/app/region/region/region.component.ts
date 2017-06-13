import { Component, OnInit, Input } from '@angular/core';
import { Region } from "app/region/region.model";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';
import { RegionService } from "app/region/region.service";
import { Place } from 'app/place/place.model';
import { PlaceService } from "app/place/place.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService, PlaceService]
})
export class RegionComponent implements OnInit {
  
  region: Region;
  Name : string;
  countryName: string;
  places: Place[];

  constructor(private regionService : RegionService, private route: Router, private activatedRoute: ActivatedRoute, 
              private placeService: PlaceService) {
    this.region = new Region();
    this.places = [];
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.regionService.getRegionByIdMap(id).subscribe(r =>
    {
      this.region = (r[0] as Region);
        console.log(this.region.Name);
        this.countryName = this.region.Country.Name;
        this.Name = this.region.Name;
        this.places = this.region.Places;
        // if (this.region.Places != null)
        // {
        //   console.log("cdcd");
        //   if (this.region.Places[0] != null)
        //   {
        //     console.log(this.region.Places[0].Name);
        //   }
        //   else
        //   {
        //     console.log("babdfsa");
        //   }
        // }
        // else
        // {
        //   console.log("tete");
        // }
    }, error => console.log(error));
  }

  onSubmit()
  {
    this.regionService.editRegion(new Region(this.region.Id, this.Name, this.region.CountryId)).subscribe();
    console.log("edited");
  }

  deletePlace(place: Place)
  {
    this.placeService.deletePlace(place.Id).subscribe(e => this.getPlaces());
  }

  getPlaces() : void{
    this.placeService.getAllPlaces().subscribe(p => this.places = p.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showPlace(id : number){
    this.route.navigate(['/home/view_place/' + id]);
  }

}
