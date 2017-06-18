using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class ManagerController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("manager")]
        public List<AppUser> GetAllManagers()
        {
            List<AppUser> appUsers = new List<AppUser>();
            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();

            foreach (var user in role.Users)
            {
                if (user.RoleId.Equals(role.Id))
                {
                    var netUser = db.Users.Where(x => x.Id == user.UserId).FirstOrDefault();
                    AppUser manager = db.AppUsers.Where(x => x.Id == netUser.addUserId).FirstOrDefault();
                    appUsers.Add(manager);
                }
            }

            return appUsers;
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("manager/{Id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanOrUnbanManager(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser user = db.AppUsers.Where(u => u.Id.Equals(Id)).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            user.IsBanned = user.IsBanned ? false : true;

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch 
            {
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)409,
                                                            new HttpError("Error during changing.")
                ));
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
