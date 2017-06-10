import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType} from 'app/accommodation-type/Type.model'

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

   @Input () type: AccommodationType;

  constructor() { }

  ngOnInit() {
  }

}
