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
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult Create(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (reservation.StartDate > reservation.EndDate)
            {
                return BadRequest(ModelState);
            }

            IQueryable<RoomReservation> roomRes = db.RoomReservations.Where(r => 
                        r.RoomId.Equals(reservation.RoomId) &&
                        ((reservation.StartDate >= r.StartDate && reservation.StartDate <= r.EndDate) ||
                        (reservation.EndDate >= r.StartDate && reservation.EndDate <= r.EndDate) ||
                        (reservation.StartDate <= r.StartDate && reservation.EndDate >= r.EndDate)));

            if (roomRes.Count() != 0)
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

            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservation", id = reservation.RoomId }, reservation);
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("Change")]
        [ResponseType(typeof(void))]
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
        [ResponseType(typeof(RoomReservation))]
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
