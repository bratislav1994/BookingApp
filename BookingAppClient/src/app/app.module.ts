import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { ListOfCountriesComponent } from './country/list-of-countries/list-of-countries.component';

const Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "login", component: LoginComponent},
  {path: "other", redirectTo:"home"}
] 


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    LogoutComponent,
    AddCountryComponent,
    ListOfCountriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
