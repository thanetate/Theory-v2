using System.Diagnostics.Contracts;
using System.Runtime.CompilerServices;
using Postgrest.Attributes;
using Postgrest.Models;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Supabase.Tutorial.Models;

[Table("users")] //users

public class User : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    // [Column("cart")]
    // public List<JObject> Cart { get; set; } = new List<JObject>();
}