namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewPropertyInRR : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoomReservations", "Canceled", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String());
            DropColumn("dbo.RoomReservations", "Canceled");
        }
    }
}
