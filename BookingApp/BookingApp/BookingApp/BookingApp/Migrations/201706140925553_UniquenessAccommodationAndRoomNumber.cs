namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UniquenessAccommodationAndRoomNumber : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Rooms", new[] { "AccommodationId" });
            CreateIndex("dbo.Rooms", new[] { "AccommodationId", "RoomNumber" }, unique: true, name: "Accommodation_RoomNumberUniqueness");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Rooms", "Accommodation_RoomNumberUniqueness");
            CreateIndex("dbo.Rooms", "AccommodationId");
        }
    }
}
