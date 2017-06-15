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
    [RoutePrefix("api/RoomReservations")]
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("ReadAll")]
        [EnableQuery]
        public IQueryable<RoomReservation> ReadAllReservations()
        {
            return db.RoomReservations.Include("User").Include("Room");
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult ReadReservation(int id)
        {
            RoomReservation reservation = db.RoomReservations.Include("Room").FirstOrDefault(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Create(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.RoomReservations.Add(reservation);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, reservation);
            }

            return Ok();
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Change")]
        public IHttpActionResult Change(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(reservation).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(reservation.Id))
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
            RoomReservation reservation = db.RoomReservations.Find(id);

            if (reservation == null)
            {
                return NotFound();
            }

            db.RoomReservations.Remove(reservation);
            db.SaveChanges();

            return Ok();
        }

        private bool ReservationExists(int id)
        {
            return db.RoomReservations.Count(e => (e.Id == id)) > 0;
        }
    }
}
