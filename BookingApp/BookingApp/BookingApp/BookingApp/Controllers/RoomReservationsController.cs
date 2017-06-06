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
    [RoutePrefix("api/RoomReservations")]
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<RoomReservation> ReadAllReservations()
        {
            return db.RoomReservations;
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult ReadReservation(int id)
        {
            RoomReservation reservation = db.RoomReservations.Find(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpPost]
        [Route("Create")]
        public IHttpActionResult Create(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservations.Add(reservation);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("Change/{id}")]
        public IHttpActionResult Change(int id, RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reservation.Id)
            {
                return BadRequest();
            }

            db.Entry(reservation).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExist(id))
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

        [HttpDelete]
        [Route("Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            RoomReservation reservation = db.RoomReservations.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if (reservation == null)
            {
                return NotFound();
            }

            db.RoomReservations.Remove(reservation);
            db.SaveChanges();

            return Ok();
        }

        private bool ReservationExist(int id)
        {
            return db.RoomReservations.Count(e => e.Id.Equals(id)) > 0;
        }
    }
}
