using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Country
    {
        public int Id { get; set; }

        [Required, StringLength(200) Index(IsUnique = true)]
        public string Name { get; set; }

        [Required, StringLength(3)]
        public string Code { get; set; }

        public IList<Region> Regions { get; set; }
    }
}