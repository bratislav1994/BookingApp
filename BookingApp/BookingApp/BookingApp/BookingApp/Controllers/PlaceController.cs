using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class PlaceController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPost]
        [Route("place")]
        public IHttpActionResult AddPlace(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Places.Add(place);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)409,
                                                            new HttpError("Place already exists.")
                ));
            }

            return Ok();
        }

        // [Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("place/{id}")]
        public IHttpActionResult DeletePlace(int id)
        {
            Place place = db.Places.Find(id);

            if (place == null)
            {
                return NotFound();
            }

            db.Places.Remove(place);
            db.SaveChanges();

            return Ok(place);
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("place")]
        public IHttpActionResult ChangePlace(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(place).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(place.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool TypeExist(int id)
        {
            return db.Places.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [Route("place")]
        public IQueryable<Place> AllPlaces()
        {
            return db.Places.Include("Region");
        }


        [HttpGet]
        [Route("place/{id}")]
        public IHttpActionResult GetPlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
