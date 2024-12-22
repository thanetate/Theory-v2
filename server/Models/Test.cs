using Postgrest.Models;
using Postgrest.Attributes;

namespace Supabase.Tutorial.Models
{
    [Table("test")]
    public class Test : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("name")]
        public string? Name { get; set; }
    }
}