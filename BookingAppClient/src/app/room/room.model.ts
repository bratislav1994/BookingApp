import { Accommodation } from 'app/accommodation/accommodation.model';

export class Room {
    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;
    AccommodationId: number;
    Accommodation: Accommodation;

    constructor (RoomNumber: number,
                BedCount: number, 
                Description: string, 
                PricePerNight: number,
                AccommodationId: number) {
        this.RoomNumber = RoomNumber;
        this.BedCount = BedCount;
        this.Description = Description;
        this.PricePerNight = PricePerNight;
        this.AccommodationId = AccommodationId;
    }
}