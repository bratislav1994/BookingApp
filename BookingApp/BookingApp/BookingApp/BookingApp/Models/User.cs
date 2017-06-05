using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public IList<RoomReservation> RoomReservations { get; set; }
        public IList<Comment> Comments { get; set; }
        public IList<Accommodation> Accommodations { get; set; }
    }
}