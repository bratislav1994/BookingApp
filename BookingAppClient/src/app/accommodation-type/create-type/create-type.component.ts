import { Component, OnInit } from '@angular/core';
import { AccommodationType } from "app/accommodation-type/Type.model";
import { TypeServiceService } from "app/accommodation-type/type-service.service";

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css'],
  providers: [TypeServiceService]
})
export class CreateTypeComponent implements OnInit {

  Name: string;
  constructor(private service : TypeServiceService ) {

   }

  ngOnInit() {
  }

  onSubmit(){
    this.service.createType(new AccommodationType(this.Name));
    this.Name = "";
  }
}
