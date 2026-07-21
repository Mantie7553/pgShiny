namespace ShinyDex.API.DTOs;

public class PokemonDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Generation { get; set; }
    public string Types { get; set; } = string.Empty;
    public string SpriteUrl { get; set; } = string.Empty;
    public bool IsShinyAvailable { get; set; }
    public List<ShinyMethodDto> ShinyMethods { get; set; } = new();
}

public class ShinyMethodDto
{
    public int Id { get; set; }
    public string Method { get; set; } = string.Empty;
    public string Odds { get; set; } = string.Empty;
    public string? Notes { get; set; }
}