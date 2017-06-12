import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "app/local-storage.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService]
})
export class HomeComponent implements OnInit {
   username: string
  constructor(private storageService: LocalStorageService) { }

  ngOnInit() {
      
  }
  
  IsLoggedIn() : boolean {

    this.username = localStorage.getItem("username");
    return this.storageService.IsLoggedIn();
    
  }
}
