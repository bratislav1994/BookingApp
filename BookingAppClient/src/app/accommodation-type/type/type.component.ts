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
   Name: string;

  constructor(private activateRouter: ActivatedRoute, private typeService : TypeServiceService) 
  {
    this.type = new AccommodationType();
   }

  ngOnInit() {
    let id = this.activateRouter.snapshot.params["Id"];
    this.typeService.getTypeByIdMap(id).subscribe(c =>
    {
      this.type = (c as AccommodationType);
      this.Name = this.type.Name;
        console.log(this.type.Name);
    }, error => console.log(error));
  }

  onSubmit()
  {
    this.typeService.editType(new AccommodationType(this.type.Id, this.Name)).subscribe(v => alert("Accommodation type succesfully changed."),
    error => {
      console.log(error), alert("Unsuccesfull change.")
    });
    this.Name = "";
  }
}