using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhaseEnd1.Migrations
{
    /// <inheritdoc />
    public partial class EmpMgmt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeptMaster",
                columns: table => new
                {
                    DeptCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeptName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeptMaster", x => x.DeptCode);
                });

            migrationBuilder.CreateTable(
                name: "EmpProfile",
                columns: table => new
                {
                    EmpCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmpName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeptCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpProfile", x => x.EmpCode);
                });

            migrationBuilder.CreateTable(
                name: "DeptMasterEmpProfile",
                columns: table => new
                {
                    DeptMasterDeptCode = table.Column<int>(type: "int", nullable: false),
                    EmpProfileEmpCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeptMasterEmpProfile", x => new { x.DeptMasterDeptCode, x.EmpProfileEmpCode });
                    table.ForeignKey(
                        name: "FK_DeptMasterEmpProfile_DeptMaster_DeptMasterDeptCode",
                        column: x => x.DeptMasterDeptCode,
                        principalTable: "DeptMaster",
                        principalColumn: "DeptCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeptMasterEmpProfile_EmpProfile_EmpProfileEmpCode",
                        column: x => x.EmpProfileEmpCode,
                        principalTable: "EmpProfile",
                        principalColumn: "EmpCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeptMasterEmpProfile_EmpProfileEmpCode",
                table: "DeptMasterEmpProfile",
                column: "EmpProfileEmpCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeptMasterEmpProfile");

            migrationBuilder.DropTable(
                name: "DeptMaster");

            migrationBuilder.DropTable(
                name: "EmpProfile");
        }
    }
}
