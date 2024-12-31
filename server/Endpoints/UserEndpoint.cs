using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Supabase;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;

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
                // Cart = user.Cart
            };
            return Results.Ok(userResponse);
        });
    
    }
}
public class UserResponse
{
    public Guid Id { get; set; }
}