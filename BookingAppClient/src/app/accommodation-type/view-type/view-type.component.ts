import { Component, OnInit } from '@angular/core';
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css'],
  providers: [TypeServiceService]
})
export class ViewTypeComponent implements OnInit {

  types : AccommodationType [];

  constructor(private service : TypeServiceService, private router : Router) {
      this.types = [];
   }

  ngOnInit() {
    this.getTypes();
  }

  deleteType(type: AccommodationType)
  {
    this.service.deleteType(type.Id).subscribe(
      e => 
      {
            this.getTypes();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Accommodation type successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = error.json().Message;   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }

  showType(id : number){
    this.router.navigate(['/home/view_type/' + id]);
  }

   getTypes() : void{
    this.service.getAllTypes().subscribe(e => this.types = e.json(),
    error => { console.log(error), alert("Unsuccessful fetch operation")});
  }
}
