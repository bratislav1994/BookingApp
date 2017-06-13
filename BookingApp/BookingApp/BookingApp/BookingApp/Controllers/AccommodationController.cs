using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{ 
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("accommodation")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation()
        {
            Accommodation accommodation = new Accommodation();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            accommodation = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);

            foreach (string file in httpRequest.Files)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".png" };
                    var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext.ToLower();

                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        return BadRequest();
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath("~/Content/" + postedFile.FileName);
                        accommodation.ImageUrl = "Content/" + postedFile.FileName;
                        postedFile.SaveAs(filePath);
                    }
                }
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = accommodation.Id }, accommodation);
        }

        // [Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("accommodation/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);

            if (accommodation == null)
            {
                return NotFound();
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return Ok(accommodation);
        }

      //  [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("accommodation/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult ChangeAccommodation(int id, Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accommodation.Id)
            {
                return BadRequest();
            }

            db.Entry(accommodation).State = System.Data.Entity.EntityState.Modified;

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
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [EnableQuery]
        [Route("accommodation")]
        public IQueryable<Accommodation> AllAccommodations()
        {
            return db.Accommodations;
        }

        [HttpGet]
        [Route("accommodation/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation appAccommodation = db.Accommodations.Find(id);
            if (appAccommodation == null)
            {
                return NotFound();
            }

            return Ok(appAccommodation);
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
