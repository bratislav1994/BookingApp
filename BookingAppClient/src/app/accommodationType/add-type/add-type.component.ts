import { Component, OnInit } from '@angular/core';
import { AccommodationType } from "app/accommodationType/add-type/AccommodationType.model"
import { AddTypeService } from "././add-type.service"

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
  providers: [AddTypeService]
})
export class AddTypeComponent implements OnInit {

  Name : string;
  constructor(private addTypeService: AddTypeService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.addTypeService.addNewType(new AccommodationType(this.Name)).subscribe();
    this.Name = "";
  }
}
