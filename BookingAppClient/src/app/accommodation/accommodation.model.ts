import { Place } from "app/place/place.model";
import { User } from "app/login/userLogin.model"
import { AccommodationType } from "app/accommodation-type/type.model"

export class Accommodation {
    Id: number;
    Name: string;
    Description: string;
    Address: string;
    AvrageGrade: number;
    Latitude: number;
    Longitude: number;
    ImageUrl: string;
    Approved: boolean;
    PlaceId: number;
    AccommodationTypeId: number;
    UserId: number;
    Place: Place;
   // User: User;
    AccommodationType: AccommodationType

    constructor(Id?: number, Name?: string, description?: string, address?: string,
                lat?: number, long?: number, img?: string, approved?: boolean,
                placeId?: number, accommodationTypeId?: number, userId?: number
                ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = description;
        this.Address = address;
        this.Latitude = lat;
        this.Longitude = long;
        this.ImageUrl = img;
        this.Approved = approved
        this.PlaceId = placeId;
        this.AccommodationTypeId = accommodationTypeId;
        this.UserId = userId;
    }
}