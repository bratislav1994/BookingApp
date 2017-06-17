import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicUrl } from "app/DynamicUrl.model";
import { LocalEnum } from "app/localEnum.model";
import { LocalStorageService } from "app/local-storage.service";
import { UserloginService } from "app/login/userlogin.service";
import { User } from "app/login/userLogin.model";
import { NgForm } from '@angular/forms';
import { UserRegistration } from "app/registration/userregistration.model";
import { UserService } from "app/registration/User.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService, UserloginService, UserService]
})
export class AppComponent {
  title = 'app';
  username: string;

  constructor(private storageService : LocalStorageService, private router: Router,
              private userService: UserloginService, private registrationService : UserService) { }

  ngOnInit() {
     
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

  logIn(user: User, form: NgForm) {
    console.log(user.Username);
    this.userService.login(user.Username, user.Password, "password").subscribe(result => { 
          localStorage.setItem(LocalEnum.User.toString(), result.json()['access_token']); // token
          localStorage.setItem(LocalEnum.Role.toString(), result.headers.get("Role")); // Admin, Manager, AppUser
          localStorage.setItem(LocalEnum.Id.toString(), result.headers.get("Id")); // user_id u accommodation
          localStorage.setItem(LocalEnum.Username.toString(), user.Username); // estetski, gornji desni ugao :D
          form.reset();
          document.getElementById("close").click();
          this.router.navigate(['/home']);
        },
    error => 
     {
            // var doc = document.getElementById("errorMsg");
            // doc.innerText = error.json().Message;  
            // doc.className = "show";
            // setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
            alert(error.json().Message); 
     }
    );
  }

  signUp(user: UserRegistration, form: NgForm) {
    this.registrationService.register(new UserRegistration(user.Username, user.Password, user.Role, user.Email, user.ConfirmPassword)).subscribe(
     x =>
     {
            var doc = document.getElementById("successMsg");
            doc.innerText = "Registration successfully completed.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
            form.reset();
            document.getElementById("close2").click();
            this.router.navigate(['/home']);
     },
     error =>
     {
            // var doc = document.getElementById("errorMsg");
            // doc.innerText = error.json().Message;   
            // doc.className = "show";
            // setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
            alert(error.json().Message); 
     }
    );
  }

}
