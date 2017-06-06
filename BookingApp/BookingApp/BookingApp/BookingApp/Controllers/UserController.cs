﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Models;
using System.Web.Http.Description;
using BookingApp.Models;
using System.Data.Entity.Infrastructure;

namespace BookingApp.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("ReadAll")]
        public IQueryable<AppUser> ReadAllUsers()
        {
            return db.AppUsers;
        }

        [HttpGet]
        [Route("Read/{id}")]
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult ReadUser(int id)
        {
            AppUser user = db.AppUsers.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [Route("Create")]
        public IHttpActionResult CreateUser(AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AppUsers.Add(user);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("Change/{id}")]
        public IHttpActionResult Put(int id, AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExist(id))
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
            AppUser user = db.AppUsers.Where(e => e.Id.Equals(id)).FirstOrDefault();

            if(user == null)
            {
                return NotFound();
            }

            db.AppUsers.Remove(user);
            db.SaveChanges();

            return Ok();
        }

        private bool UserExist(int id)
        {
            return db.AppUsers.Count(e => e.Id.Equals(id)) > 0;
        }
    }
}