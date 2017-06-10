import { Component, OnInit } from '@angular/core';
import { AccommodationType } from "app/accommodationType/AccommodationType.model"
import { TypeService } from "app/accommodationType/type.service"
@Component({
  selector: 'app-read-types',
  templateUrl: './read-types.component.html',
  styleUrls: ['./read-types.component.css'],
  providers: []
  
})
export class ReadTypesComponent implements OnInit {

  types: AccommodationType[];

  constructor() { 
    this.types = [];
  }

  ngOnInit() {

  }

}
