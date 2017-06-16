import { Component, OnInit, Input } from '@angular/core';
import { Place } from "app/place/place.model";
import { Region } from "app/region/region.model";
import 'rxjs/Rx';
import { PlaceService } from "app/place/place.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [PlaceService]
})
export class PlaceComponent implements OnInit {

  place: Place;
  Name: string;
  RegionId: number;

  constructor(private placeService : PlaceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.place = new Place(0, "", 0); 
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.placeService.getPlaceByIdMap(id).subscribe(p =>
    {
      this.place = (p as Place);
      this.Name = this.place.Name;
      this.RegionId = this.place.RegionId;
        console.log(this.place.Name);
    }, error => console.log(error));
  }

  onSubmit()
  {
    this.placeService.editPlace(new Place(this.place.Id, this.Name, this.RegionId)).subscribe(
      x =>
      {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Place successfully edited.";   
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

}
