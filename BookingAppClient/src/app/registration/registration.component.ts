import { Component, OnInit } from '@angular/core';
import { UserRegistration } from "app/registration/userregistration.model";
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

  constructor(private userService : UserService) { 
  }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.userService.register(new UserRegistration(this.Username, this.Password, this.Role, this.Email, this.ConfirmPassword, false)).subscribe();
    this.Email = "";
    this.Password = "";
    this.ConfirmPassword = "";
  }
}
