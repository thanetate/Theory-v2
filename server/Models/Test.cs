using Postgrest.Models;
using Postgrest.Attributes;


namespace Supabase.Tutorial.Models;

public class Test : BaseModel
{

[Table("test")]
class City : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; }
}
}