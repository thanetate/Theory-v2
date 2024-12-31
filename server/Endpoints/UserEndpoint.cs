using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Supabase;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;
using Newtonsoft.Json.Linq;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET
        app.MapGet("/user/{id:guid}", async (Guid id, Supabase.Client client) =>
         {
             var response = await client
                 .From<User>()
                 .Where(p => p.Id == id)
                 .Get();

             var user = response.Models.FirstOrDefault();

             if (user == null)
             {
                 Console.WriteLine($"User with id: {id} found");
                 return Results.NotFound();
             }

             var userResponse = new UserResponse
             {
                 Id = user.Id,
                 Cart = user.Cart
             };
             return Results.Ok(userResponse);
         });

        // POST Add to Cart
        app.MapPost("/user/{id:guid}/add-to-cart", async (Guid id, CartItem cartItem, Supabase.Client client) =>
        {
            // Fetch the user
            var response = await client
                .From<User>()
                .Where(p => p.Id == id)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user == null)
            {
                return Results.NotFound($"User with id {id} not found");
            }

            // Append the cart item to the cart array
            var updatedCart = user.Cart?.Select(c => c.ToObject<CartItem>()).ToList() ?? new List<CartItem>();
            updatedCart.Add(cartItem);

            // Update the user's cart
            user.Cart = updatedCart.Select(c => JObject.FromObject(c)).ToList();
            await client.From<User>().Update(user);

            return Results.Ok(new { Message = "Item added to cart", Cart = user.Cart });
        });
    }
}

public class CartItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string Image { get; set; }
    public string Size { get; set; }
    public int Quantity { get; set; }
}