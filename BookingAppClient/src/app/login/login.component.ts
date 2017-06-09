import { Component, OnInit } from '@angular/core';
import { UserloginService } from './userlogin.service';
import { User } from "app/login/UserLogin.model";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserloginService]
})
export class LoginComponent implements OnInit {

  Username : string;
  Password : string;

  constructor(private userService : UserloginService) { }

  ngOnInit() {
  }

 onSubmit(){
    this.userService.login(this.Username, this.Password, "password").subscribe(result => { this.addToken(result.json())});
  }

  addToken(token : any){
    localStorage.setItem("user", token.access_token);
    this.Username = "";
    this.Password = "";
    console.log("radi");
  }
}
