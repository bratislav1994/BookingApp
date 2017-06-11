import { Component, OnInit } from '@angular/core';
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { AccommodationType } from "app/accommodation-type/Type.model";

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css'],
  providers: [TypeServiceService]
})
export class ViewTypeComponent implements OnInit {

  types : AccommodationType [];

  constructor(private service : TypeServiceService) {
      this.types = [];
   }

  ngOnInit() {
    this.service.getAllTypes().subscribe(e => this.types = e.json());
  }

}
