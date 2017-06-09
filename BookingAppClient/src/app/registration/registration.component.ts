import { Component, OnInit } from '@angular/core';
import { User } from "app/registration/User.model";
import { UserService } from './User.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  Username : string;
  Password : string;
  Email : string;
  ConfirmPassword: string;
  Role: string;
  data: string[];

  constructor(private userService : UserService) { 
    this.data = [];
    this.data.push("AppUser");
    this.data.push("Manager");
  }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.userService.register(new User(this.Username, this.Password, this.Role, this.Email, this.ConfirmPassword)).subscribe();
    this.Email = "";
    this.Password = "";
    this.ConfirmPassword = "";
  }

  onSubmitLogin(){
    this.userService.login(new User(this.Username, this.Password, this.Role, this.Email, this.ConfirmPassword)).subscribe();
    this.Email = "";
    this.Password = "";
    this.ConfirmPassword = "";
  }

}
