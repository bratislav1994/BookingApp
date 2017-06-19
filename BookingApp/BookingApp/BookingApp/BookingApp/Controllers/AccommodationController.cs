using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Http.Results;

namespace BookingApp.Controllers
{ 
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("accommodation")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            if (db.AppUsers.Where(x => x.Id.Equals(user.addUserId)).FirstOrDefault().IsBanned)
            {
                return BadRequest("You are banned. This operation isn't permitted.");
            }

            Accommodation accommodation = new Accommodation();
            var httpRequest = HttpContext.Current.Request;

            try
            {
                accommodation = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);
            }
            catch (JsonSerializationException)
            {
                return BadRequest(ModelState);
            }

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
            try
            {
                db.SaveChanges();
            }
            catch (DbEntityValidationException)
            {
                return BadRequest(ModelState);
            }
            catch (DbUpdateException)
            {
                return BadRequest(ModelState);
            }
            
            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = accommodation.Id }, accommodation);
        }

        [Authorize(Roles = "Manager")]
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

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            if (db.AppUsers.Where(x => x.Id.Equals(user.addUserId)).FirstOrDefault().IsBanned)
            {
                return BadRequest("You are banned. This operation isn't permitted.");
            }

            if (!accommodation.UserId.Equals(user.addUser.Id))
            {
                BadRequest("You don't have right to delete accommodation.");
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return Ok(accommodation);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("accommodation")]
        [ResponseType(typeof(void))]
        public IHttpActionResult ChangeAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(accommodation == null)
            {
                return BadRequest();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            if (db.AppUsers.Where(x => x.Id.Equals(user.addUserId)).FirstOrDefault().IsBanned)
            {
                return BadRequest("You are banned. This operation isn't permitted.");
            }

            if (!accommodation.UserId.Equals(user.addUser.Id))
            {
                BadRequest("You don't have right to change accommodation.");
            }

            db.Entry(accommodation).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(accommodation.Id))
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
