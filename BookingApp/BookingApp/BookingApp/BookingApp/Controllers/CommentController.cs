using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Models;
using System.Web.Http.Description;
using System.Data.Entity.Infrastructure;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Web.Http.OData;
using System.Data.Entity;
using System.Globalization;

namespace BookingApp.Controllers
{
    [RoutePrefix("api/Comment")]
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("ReadAll")]
        public IQueryable<Comment> ReadAllComments()
        {
            return db.Comments.Include("User").Include("Accommodation"); ;
        }

        [HttpGet]
        [Route("Read/{id1}/{id2}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult ReadComment(int id1, int id2)
        {
            Comment comment = db.Comments.Include("User").Include("Accommodation").FirstOrDefault(c => c.UserId == id1 && c.AccommodationId == id2);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [Authorize(Roles = "AppUser")]
        [HttpPost]
        [Route("Create")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult Create(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (comment == null)
            {
                BadRequest();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

           List<RoomReservation> reservations = ReservationsExist(comment);

            if (reservations.Count == 0)
            {
                return BadRequest("You don't have reservations for this accommodation.");
            }

            RoomReservation reservation = GetReservation(reservations);

            if (reservation == null || reservation.StartDate >= DateTime.Now)
            {
                return BadRequest("You can not comment accommodation until you are staying in the same.");
            }

            try
            {
                db.Comments.Add(comment);
                db.SaveChanges();

            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, comment);
            }

            Accommodation accommodation = db.Accommodations.Where(a => a.Id == comment.AccommodationId).FirstOrDefault();

            if (accommodation == null)
            {
                return BadRequest("There is no accommodation for which is creating comment.");
            }

            accommodation.AvrageGrade = AverageGrade(comment.AccommodationId);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Comment", id = comment.AccommodationId, id2 = comment.UserId }, comment);
        }

        private List<RoomReservation> ReservationsExist(Comment comment)
        {
            return db.RoomReservations.Where(resevation => resevation.Room.AccommodationId.Equals(comment.AccommodationId)
                && resevation.UserId.Equals(comment.UserId) && resevation.Canceled == false).ToList();
        }

        private RoomReservation GetReservation(List<RoomReservation> reservations)
        {
            return reservations.FirstOrDefault(res => res.StartDate.Equals(reservations.Min(o => o.StartDate)));
        }

        private double AverageGrade(int accId)
        {
            List<Comment> comments = db.Comments.Where(c => c.AccommodationId == accId).ToList();

            if (comments.Count > 0)
            {
                double grade;
                try
                {
                    grade = (double)(comments.Sum(c => c.Grade)) / (double)comments.Count;
                }
                catch (DivideByZeroException)
                {
                    grade = 0;
                }

                return Math.Round(grade, 1);
            }

            return 0.0;       
        }

        [Authorize(Roles = "AppUser")]
        [HttpPut]
        [Route("Change/{id}/{id2}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Change(int id, int id2, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comment.AccommodationId || id2 != comment.UserId)
            {
                return BadRequest();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            if (!comment.UserId.Equals(user.addUser.Id))
            {
                BadRequest("You don't have right to change comment.");
            }

            db.Entry(comment).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExist(id, id2))
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

        [Authorize(Roles = "AppUser")]
        [HttpDelete]
        [Route("Delete/{id}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult Delete(int id)
        {
            Comment comment = db.Comments.Find(id);

            if (comment == null)
            {
                return NotFound();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user == null)
            {
                return BadRequest("You're not log in.");
            }

            if (!comment.UserId.Equals(user.addUserId))
            {
                BadRequest("You don't have right to delete comment.");
            }

            db.Comments.Remove(comment);
            db.SaveChanges();


            Accommodation accommodation = db.Accommodations.Where(a => a.Id == comment.AccommodationId).FirstOrDefault();

            if (accommodation == null)
            {
                return BadRequest("There is no accommodation for which is changing comment.");
            }

            accommodation.AvrageGrade = AverageGrade(comment.AccommodationId);
            db.SaveChanges();

            return Ok();
        }

        private bool CommentExist(int id, int id2)
        {
            return db.Comments.Count(c => c.AccommodationId == id && c.UserId == id2) > 0;
        }
    }
}