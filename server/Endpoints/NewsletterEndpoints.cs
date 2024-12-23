using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Supabase;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;

public static class NewsletterEndpoints
{
    public static void MapNewsletterEndpoints(this WebApplication app)
    {
        // POST
        app.MapPost("/newsletters", async (CreateNewsletterRequest request, Supabase.Client client) =>
        {
            var newsletter = new Newsletter
            {
                Name = request.Name,
                Description = request.Description,
                ReadTime = request.ReadTime
            };

            var response = await client.From<Newsletter>().Insert(newsletter);

            var newNewsletter = response.Models.First();

            return Results.Ok(newNewsletter.Id);
        });

        // GET ALL
        app.MapGet("/newsletters", async (Supabase.Client client) =>
        {
            var response = await client.From<Newsletter>().Get();

            // Map to DTO
            var newsletters = response.Models.Select(n => new NewsletterResponse
            {
                Id = n.Id,
                Name = n.Name,
                Description = n.Description,
                ReadTime = n.ReadTime,
                CreatedAt = n.CreatedAt
            });

            return Results.Ok(newsletters);
        });

        // GET
        app.MapGet("/newsletters/{id}", async (long id, Supabase.Client client) =>
        {
            var response = await client
                .From<Newsletter>()
                .Where(n => n.Id == id)
                .Get();

            var newsletter = response.Models.FirstOrDefault();

            if (newsletter == null)
            {
                return Results.NotFound();
            }

            var newsletterResponse = new NewsletterResponse
            {
                Id = newsletter.Id,
                Name = newsletter.Name,
                Description = newsletter.Description,
                ReadTime = newsletter.ReadTime,
                CreatedAt = newsletter.CreatedAt
            };
            return Results.Ok(newsletterResponse);
        });

        // DELETE
        app.MapDelete("/newsletters/{id}", async (long id, Supabase.Client client) =>
        {
            await client
               .From<Newsletter>()
               .Where(n => n.Id == id)
               .Delete();

            return Results.Ok();
        });
    }
}