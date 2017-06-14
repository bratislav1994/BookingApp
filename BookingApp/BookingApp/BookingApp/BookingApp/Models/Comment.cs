using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Range(0, 5)]
        public int Grade { get; set; }

        [StringLength(300)]
        public string Text { get; set; }

        [Required, ForeignKey("User")]
        public int UserId { get; set; }
        public AppUser User { get; set; }

        [Required, ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
    }
}