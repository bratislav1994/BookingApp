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

namespace BookingApp.Controllers
{
    [RoutePrefix("api/Comment")]
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        private ApplicationUserManager userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                userManager = value;
            }
        }

        [HttpGet]
        [Route("Valitade/{id}")]
        public IHttpActionResult Validation(int id)
        {
            bool isUser = UserManager.IsInRole(User.Identity.Name, "Admin");
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            if (isUser || (user != null && user.Id.Equals(id)))
            {
                AppUser appUser = db.AppUsers.Find(id);
                if (appUser == null)
                {
                    return NotFound();
                }

                return Ok(appUser);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<Comment> ReadAllComments()
        {
            return db.Comments;
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult ReadComment(int id)
        {
            Comment comment = db.Comments.Find(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [Authorize(Roles = "AppUser")]
        [HttpPost]
        [Route("Create")]
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

            return Ok();
        }

        [Authorize(Roles = "AppUser")]
        [HttpPut]
        [Route("Change/{id}")]
        public IHttpActionResult Change(int id, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comment.Id)
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
                if (!CommentExist(id))
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
        public IHttpActionResult Delete(int id)
        {
            Comment comment = db.Comments.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok();
        }

        private bool CommentExist(int id)
        {
            return db.Comments.Count(e => e.Id.Equals(id)) > 0;
        }
    }
}