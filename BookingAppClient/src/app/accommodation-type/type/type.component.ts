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
    this.typeService.editType(new AccommodationType(this.type.Id, this.Name)).subscribe(
    v => 
    {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Accommodation type successfully edited.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
    },
    error => {
      var doc = document.getElementById("errorMsg");
            doc.innerText = "Error during editing accommodation type.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
    }
    );

    this.Name = "";
  }
}