import { Component, OnInit } from '@angular/core';
import { AccommodationType } from "app/accommodationType/AccommodationType.model"
import { TypeService } from "app/accommodationType/type.service"

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
  providers: [TypeService]
})
export class AddTypeComponent implements OnInit {

  Name : string;
  constructor(private addTypeService: TypeService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.addTypeService.addNewType(new AccommodationType(this.Name)).subscribe();
    this.Name = "";
  }
}
