
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShinyDex.API.Data;
using ShinyDex.API.DTOs;
using ShinyDex.API.Models;

namespace ShinyDex.API.Controllers;

[Route("api/pokemon")]
[ApiController]
public class ShinyMethodController : ControllerBase
{
    private readonly AppDbContext _db;
    public ShinyMethodController(AppDbContext db) : base() {_db = db;}

    [HttpGet("{id}/methods")]
    public async Task<IActionResult> GetShinyMethods(int id)
    {
        var pokemonExists = await _db.Pokemon.AnyAsync(p => p.Id == id);
        if (!pokemonExists)
            return NotFound();

        var methods = await _db.ShinyMethods.Where(sm => sm.PokemonId == id).ToListAsync();
        
        var dtos = methods.Select(m => new ShinyMethodDto
        {
            Id = m.Id,
            Method = m.Method.ToString(),
            Odds = m.Odds,
            Notes = m.Notes
        }).ToList();

        return Ok(dtos);
    }

    [HttpPost("{id}/methods")]
    public async Task<IActionResult> AddShinyMethods(
        int id,
        [FromBody] AddShinyMethodDto request
        )
    {
        var pokemonExists = await _db.Pokemon.AnyAsync(p => p.Id == id);
        if (!pokemonExists)
            return NotFound();

        if (!Enum.TryParse<EncounterMethod>(request.Method, out var parsedMethod))
            return BadRequest();
        
        var shinyMethod = new ShinyMethod
        {
            PokemonId = id,
            Method = parsedMethod,
            Odds = request.Odds,
            Notes = request.Notes
        };

        await _db.ShinyMethods.AddAsync(shinyMethod);
        await _db.SaveChangesAsync();

        var dto = new ShinyMethodDto
        {
            Id = shinyMethod.Id,
            Method = shinyMethod.Method.ToString(),
            Odds = shinyMethod.Odds,
            Notes = shinyMethod.Notes
        };

        return CreatedAtAction(nameof(GetShinyMethods), new { id }, dto);

    }
}