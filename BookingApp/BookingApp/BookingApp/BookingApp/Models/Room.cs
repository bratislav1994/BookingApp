﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int RoomNumber { get; set; }
        public int BedCount { get; set; }
        public string Description { get; set; }
        public double PricePerNight { get; set; }
        public IList<RoomReservation> RoomReservations { get; set; }

        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
    }
}