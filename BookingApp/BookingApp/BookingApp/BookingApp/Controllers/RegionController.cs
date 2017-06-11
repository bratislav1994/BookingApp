using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
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
    [RoutePrefix("region")]
    public class RegionController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin, Manager")]
        [HttpPost]
        [Route("AddRegion")]
        public IHttpActionResult AddRegion(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Regions.Add(region);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)409,
                                                            new HttpError("Region already exists.")
                ));
            }

            return Ok();
        }

        // [Authorize(Roles = "Admin, Manager")]
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

        // [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
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

        [HttpGet]
        [Route("AllRegions")]
        public IQueryable<Region> AllRegions()
        {
            return db.Regions;
        }

        [HttpGet]
        [Route("GetRegion/{id}")]
        public IHttpActionResult GetRegion(int id)
        {
            Region region = db.Regions.Find(id);
            if (region == null)
            {
                return NotFound();
            }

            return Ok(region);
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