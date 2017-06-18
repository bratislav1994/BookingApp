import { Component, OnInit } from '@angular/core';
import { AppUser } from "app/manager/appUser.model";
import { ManagerService } from "app/manager/manager.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [ManagerService]
})
export class ManagerComponent implements OnInit {

  managers : AppUser[];

  constructor(private managerService: ManagerService) {
    this.managers = [];
   }

  ngOnInit() {
    this.managerService.getAllManagers().subscribe(
      m => 
      { 
      this.managers = m.json();
      },
      error =>
      {
        console.log(error.json().Message);
      }
    );
  }

  banManager(id : number){
    this.managerService.banOrUnban(id).subscribe(
      x => 
      {
        this.managers.find(m => m.Id == id).IsBanned = true;
      }, 
      error => 
      {
        console.log(error.json().Message);
      }
    );
  }

  unbanManager(id : number){
    this.managerService.banOrUnban(id).subscribe(
      x => 
      {
        this.managers.find(m => m.Id == id).IsBanned = false;
      }, 
      error => 
      {
        console.log(error.json().Message);
      }
    );
  }

}
