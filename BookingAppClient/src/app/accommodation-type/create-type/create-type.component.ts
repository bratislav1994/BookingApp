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
  
  constructor(private service : TypeServiceService ) {}

  ngOnInit() {
  }

  onSubmit(){
    this.service.createType(new AccommodationType(0, this.Name)).subscribe(e => alert("Accommodation type succesfuly added."),
      error => 
      {
        console.log(error), alert("Type already exists.")
      });
    this.Name = "";
  }
}
