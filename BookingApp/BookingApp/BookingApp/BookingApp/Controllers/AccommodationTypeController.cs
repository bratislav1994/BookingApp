using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Models;
using System.Web.Http.Description;
using System.Data.Entity.Infrastructure;

namespace BookingApp.Controllers
{
    [RoutePrefix("accommodationType")]
    public class AccommodationTypeController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("Change")]
        public IHttpActionResult Change(AccommodationType type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(type).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(type.Id))
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

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Add(AccommodationType type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.AccommodationsTypes.Add(type);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, type);
            }
           
            return Ok();
        }

        //[Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            AccommodationType type = db.AccommodationsTypes.Find(id);

            if (type == null)
            {
                return NotFound();
            }

            db.AccommodationsTypes.Remove(type);
            db.SaveChanges();

            return Ok(type);
        }
       
        private bool TypeExist(int id)
        {
            return db.AccommodationsTypes.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<AccommodationType> ReadAllTypes()
        {
            return db.AccommodationsTypes;
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult ReadType(int id)
        {
            AccommodationType type = db.AccommodationsTypes.Find(id);

            if (type == null)
            {
                return NotFound();
            }

            return Ok(type);
        }
    }
}