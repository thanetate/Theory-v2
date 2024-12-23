using System.Diagnostics.Contracts;
using System.Runtime.CompilerServices;
using Postgrest.Attributes;
using Postgrest.Models;

namespace Supabase.Tutorial.Models;

[Table("products")] //products

public class Product : BaseModel
{
    [PrimaryKey("id", false)]
    public long Id { get; set; }

    [Column("name")]

    public string Name { get; set; }

    [Column("description")]

    public string Description { get; set; }

    [Column("price")]

    public int Price { get; set; }

    [Column("image")]

    public string Image { get; set; }

    [Column("created_at")]

    public DateTime CreatedAt { get; set; }
}