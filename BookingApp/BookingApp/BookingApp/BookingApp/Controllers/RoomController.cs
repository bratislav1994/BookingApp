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

namespace BookingApp.Controllers
{
    [RoutePrefix("api/Room")]
    public class RoomController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("ReadAll")]
        [EnableQuery]
        public IQueryable<Room> ReadAllRooms()
        {
            return db.Rooms.Include("Accommodation");
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult ReadRoom(int id)
        {
            Room room = db.Rooms.Include("Accommodation").FirstOrDefault(r => r.Id == id);
            
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        [Authorize (Roles = "Manager")]
        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Create(Room room)
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

            Accommodation accommodation = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();

            if (accommodation == null || accommodation.UserId != user.addUser.Id)
            {
                return BadRequest("There is no accommodation for which is creating room.");
            }

            try
            {
                db.Rooms.Add(room);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, room);
            }

            return Ok();
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Change")]
        public IHttpActionResult Change(Room room)
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

            Accommodation accommodation = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();

            if (accommodation == null || accommodation.UserId != user.addUser.Id)
            {
                return BadRequest("There is no accommodation for which is changing room.");
            }

            db.Entry(room).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExist(room.Id))
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

        [Authorize(Roles = "Manager")]
        [HttpDelete]
        [Route("Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            Room room = db.Rooms.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if (room == null)
            {
                return NotFound();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            Accommodation accommodation = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();

            if (accommodation == null || accommodation.UserId != user.addUser.Id)
            {
                return BadRequest("There is no accommodation for which is deleting room.");
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return Ok();
        }

        private bool RoomExist(int id)
        {
            return db.Rooms.Count(e => e.Id.Equals(id)) > 0;
        }
    }
}
