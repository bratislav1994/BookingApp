using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }
        public IList<RoomReservation> RoomReservations { get; set; }
        public IList<Comment> Comments { get; set; }
        public IList<Accommodation> Accommodations { get; set; }
    }
}