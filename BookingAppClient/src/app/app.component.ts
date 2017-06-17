import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicUrl } from "app/DynamicUrl.model";
import { LocalEnum } from "app/localEnum.model";
import { LocalStorageService } from "app/local-storage.service";
import { UserloginService } from "app/login/userlogin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService, UserloginService]
})
export class AppComponent {
  title = 'app';
  username: string;
  Username: string = "";
  Password: string = "";

  constructor(private storageService : LocalStorageService, private router: Router,
              private userService: UserloginService) { }

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

  logIn() {
    this.userService.login(this.Username, this.Password, "password").subscribe(result => { 
          localStorage.setItem(LocalEnum.User.toString(), result.json()['access_token']); // token
          localStorage.setItem(LocalEnum.Role.toString(), result.headers.get("Role")); // Admin, Manager, AppUser
          localStorage.setItem(LocalEnum.Id.toString(), result.headers.get("Id")); // user_id u accommodation
          localStorage.setItem(LocalEnum.Username.toString(), this.Username); // estetski, gornji desni ugao :D
          document.getElementById("close").click();
          this.router.navigate(['/home']);
        },
    error => 
     {
        console.log(error), alert("Unsuccessful login")
     }
    );
  }

}
