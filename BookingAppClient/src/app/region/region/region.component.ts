import { Component, OnInit, Input } from '@angular/core';
import { Region } from "app/region/region.model";
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/Rx';
import { RegionService } from "app/region/region.service"

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService]
})
export class RegionComponent implements OnInit {
  
  region: Region;

  constructor(private regionService : RegionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.region = new Region(0, "", 0);
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["Id"];
    this.regionService.getRegionByIdMap(id).subscribe(r =>
    {
      this.region = (r[0] as Region);
        console.log(this.region.Name);
    }, error => console.log(error));
  }

}
