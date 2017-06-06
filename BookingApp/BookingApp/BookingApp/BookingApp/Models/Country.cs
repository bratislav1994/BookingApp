using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Country
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }


        public string Code { get; set; }
        public IList<Region> Regions { get; set; }
    }
}