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
    [RoutePrefix("region")]
    public class RegionController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AddRegion")]
        public IHttpActionResult AddRegion(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Regions.Add(region);
            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("DeleteRegion/{id}")]
        public IHttpActionResult DeleteRegion(int id)
        {
            Region region = db.Regions.Find(id);

            if (region == null)
            {
                return NotFound();
            }

            db.Regions.Remove(region);
            db.SaveChanges();

            return Ok(region);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("ChangeRegion/{id}")]
        public IHttpActionResult ChangeRegion(int id, Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != region.Id)
            {
                return BadRequest();
            }

            db.Entry(region).State = System.Data.Entity.EntityState.Modified;

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
            return db.Regions.Count(e => e.Id == id) > 0;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("AllRegions")]
        public IQueryable<Region> AllRegions()
        {
            return db.Regions;
        }
    }
}