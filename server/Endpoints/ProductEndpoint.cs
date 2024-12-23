using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Supabase;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this WebApplication app)
    {
        // GET ALL
        app.MapGet("/products", async (Supabase.Client client) => 
        {
            var response = await client.From<Product>().Get();

            // Map to DTO
            var products = response.Models.Select(p => new ProductResponse
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Image = p.Image,
                CreatedAt = p.CreatedAt
            });
            return Results.Ok(products);
        });

        // GET
        app.MapGet("/products/{id}", async (long id, Supabase.Client client) =>
        {
            var response = await client
                .From<Product>()
                .Where(p => p.Id == id)
                .Get();

            var product = response.Models.FirstOrDefault();

            if (product == null)
            {
                return Results.NotFound();
            }

            var productResponse = new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Image = product.Image,
                CreatedAt = product.CreatedAt
            };
            return Results.Ok(productResponse);
        });
    }
}