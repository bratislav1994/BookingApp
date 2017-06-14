import { Accommodation } from 'app/accommodation/accommodation.model';
import { RoomReservation } from 'app/room-reservation/reservation.model';

export class Room {
    Id: number;
    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;
    AccommodationId: number;
    Accommodation: Accommodation;
    Reservations: RoomReservation[];

    constructor (Id?: number,
                RoomNumber?: number,
                BedCount?: number, 
                Description?: string, 
                PricePerNight?: number,
                AccommodationId?: number) {
        this.Id = Id;
        this.RoomNumber = RoomNumber;
        this.BedCount = BedCount;
        this.Description = Description;
        this.PricePerNight = PricePerNight;
        this.AccommodationId = AccommodationId;
        this.Reservations = [];
    }
}