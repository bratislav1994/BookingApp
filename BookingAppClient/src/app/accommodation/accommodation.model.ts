import { Place } from "app/place/place.model";
import { User } from "app/login/userLogin.model";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { Room } from "app/room/room.model";

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
    Rooms: Room[];
   // User: User;
    AccommodationType: AccommodationType

    constructor(Id?: number, Name?: string, description?: string, address?: string,
                lat?: number, long?: number, placeId?: number, accommodationTypeId?: number, userId?: number
                ) {
        this.Name = Name;
        this.Description = description;
        this.Address = address;
        this.Latitude = lat;
        this.Longitude = long;
        this.Rooms = [];
        this.AccommodationType = new AccommodationType();
        this.Place = new Place();
        this.PlaceId = placeId;
        this.AccommodationTypeId = accommodationTypeId;
        this.UserId = userId;
    }
}