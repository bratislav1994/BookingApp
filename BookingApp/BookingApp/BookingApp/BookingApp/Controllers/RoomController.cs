using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace BookingApp.Controllers
{
    [RoutePrefix("api/Room")]
    public class RoomController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<Room> ReadAllRooms()
        {
            return db.Rooms;
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult ReadRoom(int id)
        {
            Room room = db.Rooms.Find(id);

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

            db.Rooms.Add(room);
            db.SaveChanges();

            return Ok();
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Change/{id}")]
        public IHttpActionResult Change(int id, Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != room.Id)
            {
                return BadRequest();
            }

            db.Entry(room).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExist(id))
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
