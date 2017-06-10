import { Place } from "app/place/place.model";

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

    constructor(Id: number, Name: string, description: string, address: string, avrage: number,
                lat: number, long: number, img: string, approved: boolean,
                placeId: number, accommodationTypeId: number, userId: number
                ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = description;
        this.Address = address;
        this.AvrageGrade = avrage;
        this.Latitude = lat;
        this.Longitude = long;
        this.ImageUrl = img;
        this.Approved = approved
        this.PlaceId = placeId;
        this.AccommodationTypeId = accommodationTypeId;
        this.UserId = userId;
    }
}