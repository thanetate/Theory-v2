namespace Supabase.Tutorial.Contracts;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
public class UserResponse
{
    public Guid? Id { get; set; }
    public List<JObject>? Cart { get; set; } = new List<JObject>();

    public List<JObject>? Orders { get; set; } = new List<JObject>();
}
