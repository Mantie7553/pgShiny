using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ShinyDex.API.Models;

namespace ShinyDex.API.Data;

public static class ShinyMethodSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.ShinyMethods.AnyAsync())
        {
            Console.WriteLine("ShinyMethods table already seeded, skipping.");
            return;
        }

        var path = Path.Combine(AppContext.BaseDirectory, "Data", "shiny-methods.json");

        if (!File.Exists(path))
        {
            Console.WriteLine($"shiny-methods.json not found at {path}, skipping.");
            return;
        }

        var json = await File.ReadAllTextAsync(path);
        var entries = JsonSerializer.Deserialize<List<ShinyMethodSeedEntry>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (entries is null || entries.Count == 0)
        {
            Console.WriteLine("No entries found in shiny-methods.json.");
            return;
        }

        var methods = new List<ShinyMethod>();
        var pokemonIdsToUpdate = new List<int>();

        foreach (var entry in entries)
        {
            pokemonIdsToUpdate.Add(entry.PokemonId);

            foreach (var m in entry.Methods)
            {
                if (!Enum.TryParse<EncounterMethod>(m.Method, out var parsedMethod))
                {
                    Console.WriteLine($"Unknown method '{m.Method}' for PokemonId {entry.PokemonId}, skipping.");
                    continue;
                }

                methods.Add(new ShinyMethod
                {
                    PokemonId = entry.PokemonId,
                    Method = parsedMethod,
                    Odds = m.Odds,
                    Notes = m.Notes
                });
            }
        }

        var pokemon = await db.Pokemon
            .Where(p => pokemonIdsToUpdate.Contains(p.Id))
            .ToListAsync();

        foreach (var p in pokemon)
            p.IsShinyAvailable = true;

        await db.ShinyMethods.AddRangeAsync(methods);
        await db.SaveChangesAsync();

        Console.WriteLine($"Seeded {methods.Count} shiny methods across {entries.Count} Pokémon.");
    }
}

file class ShinyMethodSeedEntry
{
    public int PokemonId { get; set; }
    public List<ShinyMethodEntry> Methods { get; set; } = new();
}

file class ShinyMethodEntry
{
    public string Method { get; set; } = string.Empty;
    public string Odds { get; set; } = string.Empty;
    public string? Notes { get; set; }
}