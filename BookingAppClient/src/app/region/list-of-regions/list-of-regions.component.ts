import { Component, OnInit } from '@angular/core';
import { RegionService } from "app/region/region.service";
import { Region } from "app/region/Region.model";

@Component({
  selector: 'app-list-of-regions',
  templateUrl: './list-of-regions.component.html',
  styleUrls: ['./list-of-regions.component.css'],
  providers: [RegionService]
})
export class ListOfRegionsComponent implements OnInit {

  regions: Region[];

  constructor(private regionService : RegionService) { 
    this.regions = [];
  }

  ngOnInit() {
    this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  deleteRegion(region: Region)
  {
    this.regionService.deleteRegion(region.Id).subscribe();
    var id = this.regions.indexOf(region);
    this.regions.splice(id, 1);
  }

}
