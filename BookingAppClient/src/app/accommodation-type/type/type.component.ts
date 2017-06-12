import { Component, OnInit, Input } from '@angular/core';
import { AccommodationType} from 'app/accommodation-type/Type.model'
import { Router, ActivatedRoute } from "@angular/router";
import { TypeServiceService } from 'app/accommodation-type/type-service.service'
@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  providers: [TypeServiceService]
})
export class TypeComponent implements OnInit {

   type: AccommodationType;

  constructor(private activateRouter: ActivatedRoute, private typeService : TypeServiceService) 
  {
    this.type = new AccommodationType("");
   }

  ngOnInit() {
    let id = this.activateRouter.snapshot.params["Id"];
    this.typeService.getTypeByIdMap(id).subscribe(c =>
    {
      this.type = (c as AccommodationType);
        console.log(this.type.Name);
    }, error => console.log(error));
  }
}
