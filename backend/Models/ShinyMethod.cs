namespace ShinyDex.API.Models;

public class ShinyMethod
{
    public int Id { get; set; }
    public int PokemonId {get; set; }
    public EncounterMethod Method { get; set; }
    public string Odds { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public Pokemon Pokemon {get; set; } = null!;

}

public enum EncounterMethod
{
    Wild,
    Egg,
    Raid,
    Research,
    CommunityDay,
    SpotlightHour,
    Event,
    Routes,
    Lure,
    Incense,
    Snapshot,
}