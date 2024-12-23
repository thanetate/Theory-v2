namespace Supabase.Tutorial.Contracts;

public class CreateProductRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string Image { get; set; }
}