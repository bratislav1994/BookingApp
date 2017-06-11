import { User } from "app/login/userLogin.model"
import { Accommodation } from "app/accommodation/accommodation.model"

export class Comment {
    Id: number;
    Grade: number;
    Text: string;
    UserId: number;
    User: User;
    AccommodationId: number;
    Accommodation: Accommodation;

    constructor(Id:number, 
                Grade: number, 
                text: string,
                UserId: number,
                AccommodationId: number) {
        this.Id = Id;
        this.Grade = Grade;
        this.Text = text;
        this.UserId = UserId;
        this.AccommodationId = AccommodationId;
    }
}