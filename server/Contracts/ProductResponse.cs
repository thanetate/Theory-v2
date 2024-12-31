namespace Supabase.Tutorial.Contracts;

public class ProductResponse
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }

}
