namespace ShinyDex.API.Models;

public class Pokemon
{
    public int Id { get; set; }
    public string Name {get; set; } = string.Empty;
    public int Generation { get; set; }
    public string Types { get; set;} = string.Empty;
    public string SpriteUrl { get; set; } = string.Empty;
    public bool IsShinyAvailable { get; set; }

    public ICollection<ShinyMethod> ShinyMethods { get; set; } = new List<ShinyMethod>();
}