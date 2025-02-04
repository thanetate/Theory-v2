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
                return Results.NotFound($"User with id {id} not found");
            }

            // Ensure Cart is deserialized properly, if it's a JSON object or string
            if (user.Cart != null && user.Cart.Count == 0)
            {
                // You can explicitly check if Cart is an empty list
                user.Cart = new List<CartItem>();  // Set to an empty list if it's not deserialized properly
            }

            var userResponse = new UserResponse
            {
                Id = user.Id,
                Cart = user.Cart?.Select(item => JObject.FromObject(item)).ToList() ?? new List<JObject>()
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

            // Directly return the user's cart
            var cart = user.Cart ?? new List<CartItem>();
            return Results.Ok(cart);
        });
        // POST add item to Cart
        app.MapPost("/user/{id:guid}/add-to-cart", async (Guid id, CartItem cartItem, Supabase.Client client) =>
        {
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
            var updatedCart = user.Cart ?? new List<CartItem>();

            // Add the new cart item
            updatedCart.Add(cartItem);

            // Update the user's cart with the new item
            user.Cart = updatedCart;

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

            // Ensure the Cart is properly fetched and contains CartItems
            var updatedCart = user.Cart ?? new List<CartItem>();

            // Find the item to remove
            if (!int.TryParse(productId, out int productIdInt))
            {
                return Results.BadRequest($"Invalid product id {productId}");
            }

            var itemToRemove = updatedCart.FirstOrDefault(c => c.Id == productIdInt);

            if (itemToRemove == null)
            {
                return Results.NotFound($"Product with id {productId} not found in cart");
            }

            // Remove the item from the cart
            updatedCart.Remove(itemToRemove);

            // Update the user's cart with the modified list of CartItems
            user.Cart = updatedCart;

            // Save the updated user data
            await client.From<User>().Update(user);

            // Return the updated cart in the response
            return Results.Ok(new { Message = "Item removed from cart", Cart = updatedCart });
        });

        // DELETE all items from Cart
        app.MapDelete("/user/{userId:guid}/cart", async (Guid userId, Supabase.Client client) =>
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

            // Update the user's cart with an empty list
            user.Cart = new List<CartItem>();

            // Save the updated user data
            await client.From<User>().Update(user);

            return Results.Ok(new { Message = "Cart cleared", Cart = user.Cart });
        });

        // GET user orders
        app.MapGet("/user/{id:guid}/orders", async (Guid id, Supabase.Client client) =>
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

            // Directly return the user's orders
            var orders = user.Orders ?? new List<OrdersItem>();
            return Results.Ok(orders);
        });
        // POST create order
        app.MapPost("/user/{id:guid}/add-to-orders", async (Guid id, OrdersItem ordersItem, Supabase.Client client) =>
        {
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
            var updatedOrder = user.Orders ?? new List<OrdersItem>();

            // Add the new cart item
            updatedOrder.Add(ordersItem);

            // Update the user's cart with the new item
            user.Orders = updatedOrder;

            // Save the updated user data
            await client.From<User>().Update(user);

            return Results.Ok(new { Message = "Items added to orders", Order = updatedOrder });
        });

    }
}

//Todo: move these to a model
public class CartItem
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }
    public string? Image { get; set; }
    public string? Size { get; set; }
    public int Quantity { get; set; }
}

public class OrdersItem
{
    public string? Description { get; set; }
    public string? Id { get; set; }
    public int Quantity { get; set; }

    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Line1 { get; set; }
    public string? Line2 { get; set; }
    public string? PostalCode { get; set; }
    public string? State { get; set; }
    public string? Size { get; set; }
}