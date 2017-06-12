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

        [Required, StringLength(100)]
        public string Name { get; set; }

        [StringLength(300)]
        public string Description { get; set; }

        [Required, StringLength(300)]
        public string Address { get; set; }

        [Range(1, 5)]
        public double AvrageGrade { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required, DataType(DataType.ImageUrl)]
        public string ImageUrl { get; set; }

        [Required]
        public bool Approved { get; set; }

        [Required, ForeignKey("AccommodationType")]
        public int AccommodationTypeId { get; set; }
        public AccommodationType AccommodationType { get; set; }

        public IList<Room> Rooms { get; set; }
        public IList<Comment> Comments { get; set; }

        [Required, ForeignKey("User")]
        public int UserId { get; set; }
        public AppUser User { get; set; }

        [Required, ForeignKey("Place")]
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}