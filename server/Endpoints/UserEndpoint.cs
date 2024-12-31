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
        // GET user by Id
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
        // GET user cart
        app.MapGet("/user/{id:guid}/cart", async (Guid id, Supabase.Client client) =>
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

            // Return the user's cart
            var cart = user.Cart?.Select(c => c.ToObject<CartItem>()).ToList() ?? new List<CartItem>();
            return Results.Ok(cart);
        });
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

            // Fetch the existing cart, if any
            var updatedCart = user.Cart?.Select(c => c.ToObject<CartItem>()).ToList() ?? new List<CartItem>();

            // Add the new cart item
            updatedCart.Add(cartItem);

            // Update the user's cart with the new item
            user.Cart = updatedCart.Select(c => JObject.FromObject(c)).ToList();  // Ensure proper serialization

            // Save the updated user data
            await client.From<User>().Update(user);

            return Results.Ok(new { Message = "Item added to cart", Cart = updatedCart });
        });
        // DELETE item from Cart
        app.MapDelete("/user/{userId:guid}/cart/{productId}", async (Guid userId, string productId, Supabase.Client client) =>
        {
            // Fetch the user
            var response = await client
                .From<User>()
                .Where(p => p.Id == userId)
                .Get();

            var user = response.Models.FirstOrDefault();

            if (user == null)
            {
                return Results.NotFound($"User with id {userId} not found");
            }

            // Remove the cart item
            var updatedCart = user.Cart?.Select(c => c.ToObject<CartItem>()).ToList() ?? new List<CartItem>();
            var itemToRemove = updatedCart.FirstOrDefault(c => c.Id.ToString() == productId);

            if (itemToRemove == null)
            {
                return Results.NotFound($"Product with id {productId} not found in cart");
            }

            updatedCart.Remove(itemToRemove);

            // Update the user's cart
            user.Cart = updatedCart.Select(c => JObject.FromObject(c)).ToList();
            await client.From<User>().Update(user);

            return Results.Ok(new { Message = "Item removed from cart", Cart = user.Cart });
        });
    }
}

//Todo: move this to a model
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