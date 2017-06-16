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
        [Route("Read/{id}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult ReadComment(int id)
        {
            Comment comment = db.Comments.Include("User").Include("Accommodation").FirstOrDefault(c => c.UserId == id);

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

            try
            {
                db.Comments.Add(comment);
                db.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return Content(HttpStatusCode.Conflict, comment);
            }

            return CreatedAtRoute("DefaultApi", new { controller = "Comment", id = comment.AccommodationId, id2 = comment.UserId }, comment);
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

        [Authorize(Roles = "Admin")]
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

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok();
        }

        private bool CommentExist(int id, int id2)
        {
            return db.Comments.Count(c => c.AccommodationId == id && c.UserId == id2) > 0;
        }
    }
}