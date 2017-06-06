using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required, Range(1, 100)]
        public int RoomNumber { get; set; }

        [Required, Range(1, 3)]
        public int BedCount { get; set; }
        public string Description { get; set; }

        [Required]
        public double PricePerNight { get; set; }
        public IList<RoomReservation> RoomReservations { get; set; }

        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
    }
}