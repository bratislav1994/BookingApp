import { User } from "app/login/userLogin.model";
import { Room } from "app/room/room.model";

export class RoomReservation {
    StartDate: Date;
    EndDate: Date; 
    //TimeStamp: byte;
    UserId: number;
    User: User;
    RoomId: number;
    Room: Room;

    constructor (StartDate: Date, 
                 EndDate: Date,
                 UserId: number,
                 RoomId: number) {
       this.StartDate = StartDate;
       this.EndDate = EndDate;
       this.UserId = UserId;
       this.RoomId = RoomId;
    }
}