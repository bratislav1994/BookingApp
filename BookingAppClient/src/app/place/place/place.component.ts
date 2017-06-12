import { Component, OnInit, Input } from '@angular/core';
import { Place } from "app/place/place.model";
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

  @Input () place: Place;

  constructor(private placeService : PlaceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.place = new Place(0, "", 0); 
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.placeService.getPlaceByIdMap(id).subscribe(p =>
    {
      this.place = (p as Place);
        console.log(this.place.Name);
    }, error => console.log(error));
  }

}
