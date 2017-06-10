export class RoomReservation {
    StartDate: Date;
    EndDate: Date; 

    constructor (StartDate: Date, EndDate: Date) {
       this.StartDate = StartDate;
       this.EndDate = EndDate;
    }
}