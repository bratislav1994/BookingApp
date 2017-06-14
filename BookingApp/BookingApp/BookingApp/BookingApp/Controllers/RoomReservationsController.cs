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
        [Route("Change/{idRoom}/{idUser}/{time}")]
        public IHttpActionResult Change(int idRoom, int idUser, byte[] time, RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (idRoom != reservation.RoomId)
            {
                return BadRequest();
            }

            if (idUser != reservation.UserId)
            {
                return BadRequest();
            }

            if (time != reservation.TimeStamp)
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
                if (!ReservationExists(idRoom, idUser, time))
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

        private bool ReservationExists(int idRoom, int idUser, byte[] time)
        {
            return db.RoomReservations.Count(e => (e.RoomId == idRoom && e.UserId == idUser && e.TimeStamp == time)) > 0;
        }
    }
}
