using Microsoft.EntityFrameworkCore.Migrations;

namespace userCrudDemo.API.Migrations
{
    public partial class RemovedIsMain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Photos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Photos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
