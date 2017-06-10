export class Room {
    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;

    constructor (RoomNumber: number, BedCount: number, Description: string, PricePerNight: number) {
        this.RoomNumber = RoomNumber;
        this.BedCount = BedCount;
        this.Description = Description;
        this.PricePerNight = PricePerNight;
    }
}