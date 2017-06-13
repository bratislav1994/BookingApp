namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccommodationImageUrl : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String(nullable: false));
        }
    }
}
