using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class PlaceController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AddPlace")]
        public Place AddPlace(Place place)
        {
            return place;
        }
    }
}
