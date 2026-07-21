using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ShinyDex.API.Data;
using ShinyDex.API.DTOs;
using ShinyDex.API.Models;

namespace ShinyDex.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PokemonController : ControllerBase
{
    private readonly AppDbContext _db;
    public PokemonController(AppDbContext db) : base() { _db = db;}

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPokemon(int id)
    {
        var pokemon = await _db.Pokemon
            .Include(p => p.ShinyMethods)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pokemon == null)
        {
            return NotFound();
        }

        var dto = new PokemonDto
        {
            Id = pokemon.Id,
            Name = pokemon.Name,
            Generation = pokemon.Generation,
            Types = pokemon.Types,
            SpriteUrl = pokemon.SpriteUrl,
            IsShinyAvailable = pokemon.IsShinyAvailable,
            ShinyMethods = pokemon.ShinyMethods.Select(s => new ShinyMethodDto
            {
                Id = s.Id,
                Method = s.Method.ToString(),
                Odds = s.Odds,
                Notes = s.Notes,
            }).ToList()
        };

        return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPokemon(
        [FromQuery] int? generation,
        [FromQuery] string? type)
    {
        var query = _db.Pokemon.AsQueryable();

        if (generation.HasValue)
            query = query.Where(p => p.Generation == generation.Value);
        
        if (!string.IsNullOrEmpty(type))
            query = query.Where(p => p.Types.Contains(type));

        var pokemon = await query.ToListAsync();

        var dtos = pokemon.Select(p => new PokemonDto
        {
            Id = p.Id,
            Name = p.Name,
            Generation = p.Generation,
            Types = p.Types,
            SpriteUrl = p.SpriteUrl,
            IsShinyAvailable = p.IsShinyAvailable,
        }).ToList();

        return Ok(dtos);
    }
    
}