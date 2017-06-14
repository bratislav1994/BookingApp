import { Component, OnInit } from '@angular/core';
import { RegionService } from "app/region/region.service";
import { Region } from "app/region/Region.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-regions',
  templateUrl: './list-of-regions.component.html',
  styleUrls: ['./list-of-regions.component.css'],
  providers: [RegionService]
})
export class ListOfRegionsComponent implements OnInit {

  regions: Region[];

  constructor(private regionService : RegionService, private route : Router) { 
    this.regions = [];
  }

  ngOnInit() {
    this.getRegions();
  }

  deleteRegion(region: Region)
  {
    this.regionService.deleteRegion(region.Id).subscribe(
      e =>
      {
          this.getRegions();
          var doc = document.getElementById("successMsg");
          doc.innerText = "Region successfully deleted.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
          var doc = document.getElementById("errorMsg");
          doc.innerText = "Error while deleting region.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
      );
  }

  getRegions() : void{
    this.regionService.getAllRegions().subscribe(r => this.regions = r.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  showRegion(id : number){
    this.route.navigate(['/home/view_region/' + id]);
  }

}
