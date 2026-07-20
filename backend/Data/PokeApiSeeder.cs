using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ShinyDex.API.Models;

namespace ShinyDex.API.Data;

public static class PokeApiSeeder
{
    private static readonly HttpClient _http = new();

    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Pokemon.AnyAsync())
        {
            Console.WriteLine("Pokemon table already seeded, skipping.");
            return;
        }

        Console.WriteLine("Fetching Pokemon list from PokeAPI");

        var listUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025";
        var listJson = await _http.GetStringAsync(listUrl);
        var listDoc = JsonDocument.Parse(listJson);
        var results = listDoc.RootElement.GetProperty("results").EnumerateArray();

        var pokemonList = new List<Pokemon>();
        int count = 0;

        foreach (var entry in results)
        {
            var url = entry.GetProperty("url").GetString()!;

            var detailJson = await _http.GetStringAsync(url);
            var detail = JsonDocument.Parse(detailJson);
            var root = detail.RootElement;

            var id = root.GetProperty("id").GetInt32();

            if (id > 10000) continue;

            var name = root.GetProperty("name").GetString()!;

            var types = root.GetProperty("types")
            .EnumerateArray()
            .Select(t => t.GetProperty("type").GetProperty("name").GetString()!)
            .ToList();

            var sprite = root.GetProperty("sprites")
            .GetProperty("other")
            .GetProperty("official-artwork")
            .GetProperty("front_default")
            .GetString() ?? "";

            var generation = GetGeneration(id);

            pokemonList.Add(new Pokemon
            {
                Id = id,
                Name = name,
                Generation = generation,
                Types = string.Join(",", types),
                SpriteUrl = sprite,
                IsShinyAvailable = false
            });

            count++;
            if (count % 50 == 0)
            {
                Console.WriteLine($"Fetched {count} Pokemon");
            }
        }
        Console.WriteLine($"Saving {pokemonList.Count} Pokemon to database");
        await db.Pokemon.AddRangeAsync(pokemonList);
        await db.SaveChangesAsync();
        Console.WriteLine("Seeding completed");
    }

    private static int GetGeneration(int id) => id switch
    {
        <= 151 => 1,
        <= 251 => 2,
        <= 386 => 3,
        <= 493 => 4,
        <= 649 => 5,
        <= 721 => 6,
        <= 809 => 7,
        <= 905 => 8,
        _      => 9,
    };
}