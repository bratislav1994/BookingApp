namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomReservationUpdate : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RoomReservations");
            AddColumn("dbo.RoomReservations", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.RoomReservations", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.RoomReservations");
            DropColumn("dbo.RoomReservations", "Id");
            AddPrimaryKey("dbo.RoomReservations", new[] { "RoomId", "UserId", "TimeStamp" });
        }
    }
}
