import { Component, OnInit, Input } from '@angular/core';
import { Map} from "app/map/angular-map.model";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
    styles: ['agm-map {height: 500px; width: 500px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

 @Input() map: Map;
  constructor() { }

  ngOnInit() {
  }

}
