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
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Http.Results;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class RegionController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [EnableQuery]
        [Route("region")]
        [ResponseType(typeof(Region))]
        public IHttpActionResult AddRegion(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (region == null)
            {
                return BadRequest();
            }

            if (RegionExist(region.Name))
            {
                return BadRequest("Region with name " + region.Name + " already exist.");
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

            return CreatedAtRoute("DefaultApi", new { controller = "Region", id = region.Id }, region);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("region/{id}")]
        [ResponseType(typeof(Region))]
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
        [HttpPut]
        [Route("region")]
        [ResponseType(typeof(void))]
        public IHttpActionResult ChangeRegion(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (region == null)
            {
                return BadRequest();
            }

            if (RegionExist(region.Name))
            {
                return BadRequest("Region with name " + region.Name + " already exist.");
            }

            db.Entry(region).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExist(region.Id))
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

        private bool RegionExist(int id)
        {
            return db.Regions.Count(e => e.Id == id) > 0;
        }

        private bool RegionExist(string name)
        {
            return db.Regions.Count(e => e.Name.Equals(name)) > 0;
        }

        [HttpGet]
        [Route("region")]
        [EnableQuery]
        public IQueryable<Region> AllRegions()
        {
            return db.Regions.Include("Country");
        }

        [HttpGet]
        [EnableQuery]
        [Route("region")]
        [ResponseType(typeof(Region))]
        public IHttpActionResult GetRegion([FromUri] int id)
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