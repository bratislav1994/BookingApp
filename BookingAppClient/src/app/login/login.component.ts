import { Component, OnInit } from '@angular/core';
import { UserloginService } from './userlogin.service';
import { User } from "app/login/UserLogin.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Username : string;
  Password : string;
  constructor(private userService : UserloginService) { }

  ngOnInit() {
  }

 onSubmitLogin(){
    this.userService.login(new User(this.Username, this.Password)).subscribe();
    this.Username = "";
    this.Password = "";

  }
}
