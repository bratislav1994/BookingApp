using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Models;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "AppUser")]
        [HttpPost]
        [Route("Comment")]
        public IHttpActionResult Add(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comment);
            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("Comment/{id}")]
        public IHttpActionResult Delete(int id)
        {
            Comment comment = db.Comments.Where(c => c.Id.Equals(id)).FirstOrDefault();

            if (comment == null)
            {

            }

            return Ok();
        }
    }
}
