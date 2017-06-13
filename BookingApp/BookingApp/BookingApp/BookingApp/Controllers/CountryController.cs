using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Http.Results;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class CountryController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPost]
        [Route("country")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult AddCountry(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Countries.Add(country);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)409,
                                                            new HttpError("Country already exists.")
                ));
            }

            return Ok();
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("country/{id}")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult DeleteCountry(int id)
        {
            Country country = db.Countries.Find(id);

            if (country == null)
            {
                return NotFound();
            }

            db.Countries.Remove(country);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Country", id = country.Id }, country);
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("country")]
        [ResponseType(typeof(void))]
        public IHttpActionResult ChangeCountry(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(country).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(country.Id))
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
            return db.Countries.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [EnableQuery]
        [Route("country")]
        public IQueryable<Country> AllCountries()
        {
            return db.Countries.Include("Regions");
        }

        [HttpGet]
        [EnableQuery]
        [Route("country")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult GetCountry([FromUri] int id)
        {
            Country country = db.Countries.Find(id);
            if (country == null)
            {
                return NotFound();
            }

            return Ok(country);
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