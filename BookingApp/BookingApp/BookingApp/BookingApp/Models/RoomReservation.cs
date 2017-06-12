using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservation
    {
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        [Key, Timestamp, Column(Order = 3)]
        public byte[] TimeStamp { get; set; }

        [Required, Key, Column(Order = 2), ForeignKey("User")]
        public int UserId { get; set; }
        public AppUser User { get; set; }

        [Required, Key, Column(Order = 1), ForeignKey("Room")]
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }
}