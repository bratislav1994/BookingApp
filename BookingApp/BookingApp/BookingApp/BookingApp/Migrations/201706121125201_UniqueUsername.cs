namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UniqueUsername : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AppUsers", "Username", c => c.String(nullable: false, maxLength: 30));
            CreateIndex("dbo.AppUsers", "Username", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.AppUsers", new[] { "Username" });
            AlterColumn("dbo.AppUsers", "Username", c => c.String(nullable: false));
        }
    }
}
