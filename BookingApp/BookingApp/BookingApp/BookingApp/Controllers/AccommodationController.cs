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

namespace BookingApp.Controllers
{
    [RoutePrefix("accommodation")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("AddAccommodation")]
        public IHttpActionResult AddAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("DeleteAccommodation/{id}")]
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

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("ChangeAccommodation/{id}")]
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
        [Route("AllAccommodations")]
        public IQueryable<Accommodation> AllAccommodations()
        {
            return db.Accommodations;
        }

        [HttpGet]
        [Route("GetAccommodation/{id}")]
        public IHttpActionResult GetAccommodation(int id)
        {
            bool isAdmin = UserManager.IsInRole(User.Identity.Name, "Admin");//User.Identity.Name => Username Identity User-a! UserManager trazi po njegovom username-u, i onda poredi! 
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);//Vadimo iz Identity baze po username-u Identity User-a, koji u sebi sadrzi AppUser-a!
            if (isAdmin /*|| (user != null && user.appUserId.Equals(id))*/)//Ako korisnik nije admin, i nije AppUser koji trazi podatke o sebi, nije autorizovan!
            {
                Accommodation appAccommodation = db.Accommodations.Find(id);
                if (appAccommodation == null)
                {
                    return NotFound();
                }

                return Ok(appAccommodation);
            }

            return Unauthorized();
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
