using BookingApp.Models;

namespace BookingApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BookingApp.Models.BAContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookingApp.Models.BAContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Manager" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            context.AppUsers.AddOrUpdate(
                  p => p.Username,
                  new AppUser() { Username = "admin" },
                  new AppUser() { Username = "manager"}
            );
            context.SaveChanges();

            var userStore = new UserStore<BAIdentityUser>(context);
            var userManager = new UserManager<BAIdentityUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var _userId = context.AppUsers.FirstOrDefault(a => a.Username.Equals("admin"));
                var user = new BAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("admin"), addUserId = _userId.Id};
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "manager"))
            {
                var _userId = context.AppUsers.FirstOrDefault(a => a.Username.Equals("manager"));
                var user = new BAIdentityUser() { Id = "manager", UserName = "manager", Email = "manager@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("manager"), addUserId = _userId.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Manager");
            }

            if (!context.Users.Any(u => u.UserName == "user1"))
            {
                var _userId = context.AppUsers.FirstOrDefault(a => a.Username.Equals("user1"));
                var user = new BAIdentityUser() { Id = "user1", UserName = "user1", Email = "user1@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("User1$"), addUserId = _userId.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Users.Any(u => u.UserName == "user2"))
            {
                var _userId = context.AppUsers.FirstOrDefault(a => a.Username.Equals("user2"));
                var user = new BAIdentityUser() { Id = "user2", UserName = "user2", Email = "user2@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("User2$"), addUserId = _userId.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Users.Any(u => u.UserName == "user3"))
            {
                var _userId = context.AppUsers.FirstOrDefault(a => a.Username.Equals("user3"));
                var user = new BAIdentityUser() { Id = "user3", UserName = "user3", Email = "user3@yahoo.com", PasswordHash = BAIdentityUser.HashPassword("User3$"), addUserId = _userId.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            context.Countries.AddOrUpdate(
              p => p.Id,
              new Country { Id = 1, Code = "SRB", Name = "SRBIJA "},
              new Country { Id = 2, Code = "IT", Name = "Italija" },
              new Country { Id = 3, Code = "FR", Name = "Francuska" }
            );

            context.Regions.AddOrUpdate(
                r => r.Id,
                new Region { Id = 1, Name = "Vojvodina", CountryId = 1},
                new Region { Id = 2, Name = "Grad Beograd", CountryId = 1 },
                new Region { Id = 3, Name = "Lombardija", CountryId = 2 },
                new Region { Id = 4, Name = "Pijemont", CountryId = 2 },
                new Region { Id = 5, Name = "Pariska regija", CountryId = 3 },
                new Region { Id = 6, Name = "Provanska-Alpi-Azurna obala", CountryId = 3 }
            );

            context.Places.AddOrUpdate(
                p => p.Id,
                new Place { Id = 1, Name = "Novi Sad", RegionId = 1},
                new Place { Id = 2, Name = "Beograd", RegionId = 2 },
                new Place { Id = 3, Name = "Milano", RegionId = 3 },
                new Place { Id = 4, Name = "Torino", RegionId = 4 },
                new Place { Id = 5, Name = "Pariz", RegionId = 5 },
                new Place { Id = 6, Name = "Marselj", RegionId = 6 }
            );

            context.AccommodationsTypes.AddOrUpdate(
                t => t.Id,
                new AccommodationType { Id = 1, Name = "Hotel" },
                new AccommodationType { Id = 2, Name = "Motel" },
                new AccommodationType { Id = 3, Name = "Apartman" },
                new AccommodationType { Id = 4, Name = "Hostel" }
            );

            context.Accommodations.AddOrUpdate(
                a => a.Id,
                new Accommodation { Id = 1,
                    Name = "Hotel Park",
                    AccommodationTypeId = 1,
                    Address = "Novosadskog sajma 35",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 45.252861,
                    Longitude = 19.827637,
                    PlaceId = 1,
                    UserId = 2,
                    ImageUrl = @"/Content/slika1.jpg",
                    
                },
                new Accommodation
                {
                    Id = 2,
                    Name = "Hajat",
                    AccommodationTypeId = 1,
                    Address = "Milentija Popovica 5",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 44.811128,
                    Longitude = 20.434547,
                    PlaceId = 2,
                    UserId = 2,
                    ImageUrl = @"/Content/slika2.jpg"
                },
                new Accommodation
                {
                    Id = 3,
                    Name = "Hotel degli Arcimboldi",
                    AccommodationTypeId = 1,
                    Address = "Bicocca-Zara",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 45.525745,
                    Longitude = 9.215422,
                    PlaceId = 3,
                    UserId = 2,
                    ImageUrl = @"/Content/slika3.jpg"
                },
                new Accommodation
                {
                    Id = 4,
                    Name = "Hotel Due Mondi",
                    AccommodationTypeId = 1,
                    Address = "Via Saluzzo 3",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 45.061432,
                    Longitude = 7.680840,
                    PlaceId = 4,
                    UserId = 2,
                    ImageUrl = @"/Content/slika4.jpg"
                },
                new Accommodation
                {
                    Id = 5,
                    Name = "Hotel George Washington",
                    AccommodationTypeId = 1,
                    Address = "43 rue Washington, 08. Jelisejska polja - Madlen, 75008",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 48.874383,
                    Longitude = 2.304533,
                    PlaceId = 5,
                    UserId = 2,
                    ImageUrl = @"/Content/slika5.jpg"
                },
                new Accommodation
                {
                    Id = 6,
                    Name = "Belle Corniche",
                    AccommodationTypeId = 2,
                    Address = "14 Boulevard Cassini",
                    Description = "Lorem ipsum dolor sit amet, docendi dissentiunt an sit, cum sumo omittantur in. Cum in fugit dolore. Ad pri delenit persequeris neglegentur, erant tractatos sea ad. Mutat fastidii referrentur eu per, ut alia malis aliquando sed.",
                    Latitude = 43.306661,
                    Longitude = 5.395611,
                    PlaceId = 6,
                    UserId = 2,
                    ImageUrl = @"/Content/slika6.jpg"
                }
            );

            context.Rooms.AddOrUpdate(
                r => r.Id,
                //Novi Sad
                new Room { Id = 1, AccommodationId = 1, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 15, RoomNumber = 101 },
                new Room { Id = 2, AccommodationId = 1, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 25, RoomNumber = 102 },
                new Room { Id = 3, AccommodationId = 1, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 30, RoomNumber = 103 },
                //Beograd
                 new Room { Id = 4, AccommodationId = 2, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 30, RoomNumber = 111 },
                new Room { Id = 5, AccommodationId = 2, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 45, RoomNumber = 112 },
                new Room { Id = 6, AccommodationId = 2, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 60, RoomNumber = 113 },
                 //Milano
                 new Room { Id = 7, AccommodationId = 3, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 40, RoomNumber = 1101 },
                new Room { Id = 8, AccommodationId = 3, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 60, RoomNumber = 1102 },
                new Room { Id = 9, AccommodationId = 3, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 90, RoomNumber = 1103 },
                //Torino
                 new Room { Id = 10, AccommodationId = 4, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 30, RoomNumber = 201 },
                new Room { Id = 11, AccommodationId = 4, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 40, RoomNumber = 202 },
                new Room { Id = 12, AccommodationId = 4, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 50, RoomNumber = 203 },
                 //Pariz
                new Room { Id = 13, AccommodationId = 5, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 50, RoomNumber = 405 },
                new Room { Id = 14, AccommodationId = 5, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 60, RoomNumber = 402 },
                new Room { Id = 15, AccommodationId = 5, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 80, RoomNumber = 415 },
                 //Marselj
                 new Room { Id = 16, AccommodationId = 6, BedCount = 1, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 25, RoomNumber = 550 },
                new Room { Id = 17, AccommodationId = 6, BedCount = 2, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 30, RoomNumber = 551 },
                new Room { Id = 18, AccommodationId = 6, BedCount = 3, Description = "Dolorem invidunt cu cum, mea cu perpetua periculis adipiscing. Pri aeque vivendo volutpat ea.", PricePerNight = 40, RoomNumber = 552 }
            );

            context.Comments.AddOrUpdate(
                 c => c.Id,
                 //Novi Sad
                 new Comment { Id = 1, AccommodationId = 1, Grade = 3, Text = "Prosecna usluga nista posebno.", UserId = 3 },
                 //Beograd
                 new Comment { Id = 2, AccommodationId = 2, Grade = 5, Text = "Sve pohvale za osoblje. Odusevljen.", UserId = 4 },
                 new Comment { Id = 3, AccommodationId = 2, Grade = 4, Text = "Dobri ugostitelji.", UserId = 5 },
                 //Milano
                 new Comment { Id = 4, AccommodationId = 3, Grade = 3, Text = "Osoblje nije zadovoljilo moja ocekivanja", UserId = 5 },
                 new Comment { Id = 5, AccommodationId = 3, Grade = 5, Text = "Sve pohvale za osoblje. Odusevljen.", UserId = 4 },
                 new Comment { Id = 6, AccommodationId = 3, Grade = 2, Text = "Nezadovoljan u potpunosti.", UserId = 3 }
             );
        }
    }
}
