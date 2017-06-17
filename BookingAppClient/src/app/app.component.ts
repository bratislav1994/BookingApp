import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicUrl } from "app/DynamicUrl.model";
import { LocalEnum } from "app/localEnum.model";
import { LocalStorageService } from "app/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService]
})
export class AppComponent {
  title = 'app';
  username: string;

  constructor(private storageService : LocalStorageService, private router: Router) { }

  ngOnInit() {
     // this.router.navigate(['/home/']);
  }

  IsLoggedIn() : boolean {

    this.username = localStorage.getItem(LocalEnum.Username.toString());
    return this.storageService.IsLoggedIn();
  }

  isAdmin() : boolean {
    return this.storageService.isAdmin();
  }

  isManager() : boolean {
    return this.storageService.isManager();
  }

  isUser() : boolean {
    return this.storageService.isUser();
  }

}
