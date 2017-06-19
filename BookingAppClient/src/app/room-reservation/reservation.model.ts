import { User } from "app/login/userLogin.model";
import { Room } from "app/room/room.model";

export class RoomReservation {
    Id: number;
    StartDate: Date;
    EndDate: Date; 
    //TimeStamp: byte[];
    UserId: number;
    User: User;
    RoomId: number;
    Room: Room;
    Canceled: boolean;

    constructor (Id?: number,
                 StartDate?: Date, 
                 EndDate?: Date,
                 UserId?: number,
                 RoomId?: number, 
                 Canceled?: boolean) {
       this.Id = Id;
       this.StartDate = StartDate;
       this.EndDate = EndDate;
       this.UserId = UserId;
       this.RoomId = RoomId;
       this.Canceled = Canceled;
    }
}