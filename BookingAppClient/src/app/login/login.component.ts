import { Component, OnInit } from '@angular/core';
import { UserloginService } from './userlogin.service';
import { User } from "app/login/UserLogin.model";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';

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
    this.userService.login(this.Username, this.Password, "password").subscribe(result => { 
          localStorage.setItem("user", result.json().access_token);
          localStorage.setItem("role", result.headers.get('Role'));   
          localStorage.setItem("username", this.Username); 
          this.route.navigate(['/home']);
        },
    error => 
     {
        console.log(error), alert("Unsuccessful login")
     }
    );
  }

  // addToken(token : any){
  //   let token2 = token as Response;
  //   localStorage.setItem("user",token.json()['access_token']);
  //   localStorage.setItem("id", token.headers.get("Id"));
  //   localStorage.setItem("role", token.headers.get("Role"));
  //  // console.log(token.access_token);
  //   this.Username = "";
  //   this.Password = "";
  //   console.log("radi");
  //   this.route.navigate(['/home']);
  //   console.log("radi 2");
  // }
}
