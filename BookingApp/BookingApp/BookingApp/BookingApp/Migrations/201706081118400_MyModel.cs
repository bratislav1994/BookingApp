namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MyModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Accommodations", "Name", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Accommodations", "Description", c => c.String(maxLength: 300));
            AlterColumn("dbo.Accommodations", "Address", c => c.String(nullable: false, maxLength: 300));
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String(nullable: false));
            AlterColumn("dbo.AccommodationTypes", "Name", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Comments", "Text", c => c.String(maxLength: 300));
            AlterColumn("dbo.Rooms", "Description", c => c.String(maxLength: 300));
            AlterColumn("dbo.Places", "Name", c => c.String(nullable: false, maxLength: 200));
            AlterColumn("dbo.Regions", "Name", c => c.String(nullable: false, maxLength: 200));
            AlterColumn("dbo.Countries", "Name", c => c.String(nullable: false, maxLength: 200));
            AlterColumn("dbo.Countries", "Code", c => c.String(nullable: false, maxLength: 3));
            CreateIndex("dbo.AccommodationTypes", "Name", unique: true);
            CreateIndex("dbo.Countries", "Name", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Countries", new[] { "Name" });
            DropIndex("dbo.AccommodationTypes", new[] { "Name" });
            AlterColumn("dbo.Countries", "Code", c => c.Int(nullable: false));
            AlterColumn("dbo.Countries", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Regions", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Places", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Rooms", "Description", c => c.String());
            AlterColumn("dbo.Comments", "Text", c => c.Double(nullable: false));
            AlterColumn("dbo.AccommodationTypes", "Name", c => c.String());
            AlterColumn("dbo.Accommodations", "ImageUrl", c => c.String());
            AlterColumn("dbo.Accommodations", "Address", c => c.String());
            AlterColumn("dbo.Accommodations", "Description", c => c.String());
            AlterColumn("dbo.Accommodations", "Name", c => c.String(nullable: false, maxLength: 20));
        }
    }
}
