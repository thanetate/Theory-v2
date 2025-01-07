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

    [Column("cart")]
    public List<CartItem> Cart { get; set; } = new List<CartItem>();

    [Column("orders")]

    public List<OrdersItem> Orders { get; set; } = new List<OrdersItem>();
}