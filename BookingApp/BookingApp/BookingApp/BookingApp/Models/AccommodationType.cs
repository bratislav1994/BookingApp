﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AccommodationType
    {
        public int Id { get; set; }

        [Required, StringLength(100), Index(IsUnique = true)]
        public string Name { get; set; }

        public IList<Accommodation> Accommodations { get; set; }
    }
}