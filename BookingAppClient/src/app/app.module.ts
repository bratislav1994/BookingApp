import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country/country.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { ListOfCountriesComponent } from './country/list-of-countries/list-of-countries.component';
import { AddRegionComponent } from './region/add-region/add-region.component';
import { RegionComponent } from './region/region/region.component';
import { ListOfRegionsComponent } from './region/list-of-regions/list-of-regions.component';
import { PlaceComponent } from './place/place/place.component';
import { AddPlaceComponent } from './place/add-place/add-place.component';
import { ListOfPlacesComponent } from './place/list-of-places/list-of-places.component';
import { CreateTypeComponent } from './accommodation-type/create-type/create-type.component';
import { ViewTypeComponent } from './accommodation-type/view-type/view-type.component';
import { TypeComponent } from './accommodation-type/type/type.component';
import { CreateRoomComponent } from './room/create-room/create-room.component';
import { RoomComponent } from './room/room/room.component';
import { ViewRoomComponent } from './room/view-room/view-room.component';
import { RoomReservationComponent } from './room-reservation/room-reservation/room-reservation.component';
import { CreateReservationComponent } from './room-reservation/create-reservation/create-reservation.component';
import { ViewReservationComponent } from './room-reservation/view-reservation/view-reservation.component';
import { AccommodationComponent } from './accommodation/accommodation/accommodation.component';
import { ListOfAccommodationsComponent } from './accommodation/list-of-accommodations/list-of-accommodations.component';
import { AddAccommodationComponent } from './accommodation/add-accommodation/add-accommodation.component';

const Routes = [
  { path: 'app', redirectTo: '/app', pathMatch: 'full'},
  {path: "app", component: AppComponent},
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
    ListOfCountriesComponent,
    AddRegionComponent,
    RegionComponent,
    ListOfRegionsComponent,
    PlaceComponent,
    AddPlaceComponent,
    ListOfPlacesComponent,
    CreateTypeComponent,
    ViewTypeComponent,
    TypeComponent,
    CreateRoomComponent,
    RoomComponent,
    ViewRoomComponent,
    RoomReservationComponent,
    CreateReservationComponent,
    ViewReservationComponent,
    AccommodationComponent,
    ListOfAccommodationsComponent,
    AddAccommodationComponent
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
