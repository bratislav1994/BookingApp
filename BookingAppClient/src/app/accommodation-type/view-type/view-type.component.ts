import { Component, OnInit } from '@angular/core';
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css'],
  providers: [TypeServiceService]
})
export class ViewTypeComponent implements OnInit {

  types : AccommodationType [];

  constructor(private service : TypeServiceService, private router : Router) {
      this.types = [];
   }

  ngOnInit() {
    this.service.getAllTypes().subscribe(e => this.types = e.json(),
    error => { console.log(error), alert("Unsuccessful fetch operation")});
  }

  deleteType(typeId: number)
  {
    this.service.deleteType(typeId).subscribe(e => this.service.getAllTypes());
      this.ngOnInit();

  }

  showType(id : number){
    this.router.navigate(['/home/view_type/' + id]);
  }
}
