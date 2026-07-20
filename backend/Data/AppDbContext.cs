using Microsoft.EntityFrameworkCore;
using ShinyDex.API.Models;

namespace ShinyDex.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Pokemon> Pokemon => Set<Pokemon>();
    public DbSet<ShinyMethod> ShinyMethods => Set<ShinyMethod>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ShinyMethod>()
        .HasOne(s => s.Pokemon)
        .WithMany(p => p.ShinyMethods)
        .HasForeignKey(s => s.PokemonId);

        modelBuilder.Entity<ShinyMethod>()
        .Property(s => s.Method)
        .HasConversion<string>();
    }
}