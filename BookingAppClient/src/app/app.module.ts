import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

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
import { AddCommentComponent } from './comment/add-comment/add-comment.component';
import { ViewCommentComponent } from './comment/view-comment/view-comment.component';
import { CommentComponent } from './comment/comment/comment.component';
import { AccommodationTypeHomeComponent } from './accommodation-type/accommodation-type-home/accommodation-type-home.component';
import { RoomHomeComponent } from './room/room-home/room-home.component';
import { PlaceHomeComponent } from './place/place-home/place-home.component';
import { RegionHomeComponent } from './region/region-home/region-home.component';
import { CountryHomeComponent } from './country/country-home/country-home.component';
import { AccommodationHomeComponent } from './accommodation/accommodation-home/accommodation-home.component';
import { ReservationHomeComponent } from './room-reservation/reservation-home/reservation-home.component';
import { MapComponent } from './map/map/map.component';
import { FilterComponent } from './filter/filter.component';

const ChildRoutes = [

  {path: "search", component: FilterComponent},
  {path: "accommodation_home", component: AccommodationHomeComponent},
  {path: "add_accommodation", component: AddAccommodationComponent},
  {path: "view_accommodations", component: ListOfAccommodationsComponent},
  {path: "view_accommodation/:Id", component: AccommodationComponent},

  {path: "accommodation_type_home", component: AccommodationTypeHomeComponent},
  {path: "add_accommodation_type", component: CreateTypeComponent},
  {path: "view_types", component: ViewTypeComponent},
  {path: "view_type/:Id", component: TypeComponent},

  {path: "room_home", component: RoomHomeComponent},
  {path: "add_room", component: CreateRoomComponent},
  {path: "view_rooms", component: ViewRoomComponent},
  {path: "view_room/:Id", component: RoomComponent},

  {path: "place_home", component: PlaceHomeComponent},
  {path: "add_place", component: AddPlaceComponent},
  {path: "view_places", component: ListOfPlacesComponent},
  {path: "view_place/:Id", component: PlaceComponent},

  {path: "region_home", component: RegionHomeComponent},
  {path: "add_region", component: AddRegionComponent},
  {path: "view_regions", component: ListOfRegionsComponent},
  {path: "view_region/:Id", component: RegionComponent},

  {path: "country_home", component: CountryHomeComponent},
  {path: "add_country", component: AddCountryComponent},
  {path: "view_countries", component: ListOfCountriesComponent},
  {path: "view_country/:Id", component: CountryComponent},
  
  {path: "login", component: LoginComponent},

  {path: "reservation_home", component: ReservationHomeComponent},
  {path:  "add_reservation", component: CreateReservationComponent},
  {path:  "view_reservations", component: ViewReservationComponent},
  {path:  "view_reservation/:Id", component: RoomReservationComponent}
]

const Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: "app", component: AppComponent},
  {path: "home", component: HomeComponent, children: ChildRoutes},
  {path: "registration", component: RegistrationComponent},
  
  {path: "logout", component: LogoutComponent},
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
    AddAccommodationComponent,
    AddCommentComponent,
    ViewCommentComponent,
    CommentComponent,
    AccommodationTypeHomeComponent,
    RoomHomeComponent,
    PlaceHomeComponent,
    RegionHomeComponent,
    CountryHomeComponent,
    AccommodationHomeComponent,
    ReservationHomeComponent,
    MapComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
     AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
