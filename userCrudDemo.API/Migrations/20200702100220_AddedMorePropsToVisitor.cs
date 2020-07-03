using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace userCrudDemo.API.Migrations
{
    public partial class AddedMorePropsToVisitor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Visitors",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastActive",
                table: "Visitors",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Visitors");

            migrationBuilder.DropColumn(
                name: "LastActive",
                table: "Visitors");
        }
    }
}
