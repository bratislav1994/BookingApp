using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    [RoutePrefix("country")] 
    public class CountryController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPost]
        [Route("AddCountry")]
        public IHttpActionResult AddCountry(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Countries.Add(country);
            db.SaveChanges();
            return Ok();
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("DeleteCountry/{id}")]
        public IHttpActionResult DeleteCountry(int id)
        {
            Country country = db.Countries.Find(id);

            if (country == null)
            {
                return NotFound();
            }

            db.Countries.Remove(country);
            db.SaveChanges();

            return Ok(country);
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpGet]
        [Route("ChangeCountry/{id}")]
        public IHttpActionResult ChangeCountry(int id, Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != country.Id)
            {
                return BadRequest();
            }

            db.Entry(country).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(id))
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
        [Route("AllCountries")]
        public IQueryable<Country> AllCountries()
        {
            return db.Countries;
        }

        [HttpGet]
        [Route("GetCountry/{id}")]
        public IHttpActionResult GetCountry(int id)
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