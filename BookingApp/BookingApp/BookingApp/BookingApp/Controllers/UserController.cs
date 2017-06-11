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
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private BAContext db = new BAContext();

        //[Authorize(Roles = "Admin, Manager")]
        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<AppUser> ReadAllUsers()
        {
            return db.AppUsers;
        }

        //[Authorize(Roles = "Admin, Manager")]
        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult ReadUser(int id)
        {
            AppUser user = db.AppUsers.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //[Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Create(AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.AppUsers.Add(user);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, user);
            }
 
            return Ok();
        }

        //[Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Change/{id}")]
        public IHttpActionResult Change(int id, AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExist(id))
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

       // [Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            AppUser user = db.AppUsers.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if(user == null)
            {
                return NotFound();
            }

            db.AppUsers.Remove(user);
            db.SaveChanges();

            return Ok();
        }

        private bool UserExist(int id)
        {
            return db.AppUsers.Count(e => e.Id.Equals(id)) > 0;
        }
    }
}