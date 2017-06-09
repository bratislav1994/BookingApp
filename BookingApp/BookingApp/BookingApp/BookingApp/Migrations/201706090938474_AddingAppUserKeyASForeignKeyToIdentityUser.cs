namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingAppUserKeyASForeignKeyToIdentityUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "addUserId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "addUserId");
            AddForeignKey("dbo.AspNetUsers", "addUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "addUserId", "dbo.AppUsers");
            DropIndex("dbo.AspNetUsers", new[] { "addUserId" });
            DropColumn("dbo.AspNetUsers", "addUserId");
        }
    }
}
