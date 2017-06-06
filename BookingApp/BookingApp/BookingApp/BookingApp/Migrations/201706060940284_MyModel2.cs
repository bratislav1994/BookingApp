namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MyModel2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Username", c => c.String());
            AddColumn("dbo.AppUsers", "Password", c => c.String());
            AddColumn("dbo.AppUsers", "Email", c => c.String());
            DropColumn("dbo.AppUsers", "FullName");
            DropTable("dbo.Users");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        Password = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AppUsers", "FullName", c => c.Int(nullable: false));
            DropColumn("dbo.AppUsers", "Email");
            DropColumn("dbo.AppUsers", "Password");
            DropColumn("dbo.AppUsers", "Username");
        }
    }
}
