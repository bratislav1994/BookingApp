import { Component, OnInit } from '@angular/core';
import { UserloginService } from './userlogin.service';
import { User } from "app/login/UserLogin.model";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserloginService]
})
export class LoginComponent implements OnInit {

  Username : string;
  Password : string;

  constructor(private userService: UserloginService, private route: Router) { }

  ngOnInit() {
  }

 onSubmitLogin(){
    this.userService.login(this.Username, this.Password, "password").subscribe(result => { this.addToken(result.json())}, 
    error => 
     {
        console.log(error), alert("Unsuccessful login")
     }
    );
  }

  addToken(token : any){
    localStorage.setItem("Role", token.access_token);
    console.log(token.access_token);
    this.Username = "";
    this.Password = "";
    console.log("radi");
    this.route.navigate(['/home']);
    console.log("radi 2");
  }
}
