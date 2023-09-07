using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhaseEnd1.Models;

namespace PhaseEnd1.Data
{
    public class PhaseEnd1DBContext : DbContext
    {
        public PhaseEnd1DBContext (DbContextOptions<PhaseEnd1DBContext> options)
            : base(options)
        {
        }

        public DbSet<PhaseEnd1.Models.DeptMaster> DeptMaster { get; set; } = default!;

        public DbSet<PhaseEnd1.Models.EmpProfile>? EmpProfile { get; set; }
    }
}
