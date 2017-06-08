import { Component, OnInit } from '@angular/core';
import { User } from "app/registration/User.model";
import { UserService } from './User.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  Username : string;
  Password : string;

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.userService.register(new User(this.Username, this.Password, "User")).subscribe();
    this.Username = "";
    this.Password = "";
  }

  onSubmitLogin(){
    this.userService.login(new User(this.Username, this.Password, "User")).subscribe();
    this.Username = "";
    this.Password = "";
  }

}
