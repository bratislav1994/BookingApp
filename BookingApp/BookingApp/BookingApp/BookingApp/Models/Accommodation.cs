using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Accommodation
    {
        public int Id { get; set; }

        [Required, StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }

        [Range(1, 5)]
        public double AvrageGrade { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        [DataType(DataType.ImageUrl)]
        public string ImageUrl { get; set; }
        public bool Approved { get; set; }

        [ForeignKey("AccommodationType")]
        public int AccommodationTypeId { get; set; }
        public AccommodationType AccommodationType { get; set; }

        public IList<Room> Rooms { get; set; }
        public IList<Comment> Comments { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public AppUser User { get; set; }

        [ForeignKey("Place")]
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}