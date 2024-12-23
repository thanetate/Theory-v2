using Swashbuckle.AspNetCore.SwaggerGen;
using Supabase;
using Supabase.Interfaces;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;

// initialize the web application
var builder = WebApplication.CreateBuilder(args);

// adds services to the dependency injection container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// connection to supabase
builder.Services.AddScoped<Supabase.Client>(_ =>

    new Supabase.Client(
        builder.Configuration["SupabaseUrl"],
        builder.Configuration["SupabaseKey"],
        new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }
    )
);

// build the web application
var app = builder.Build();

// adds swagger UI in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Endpoints
//POST
app.MapPost("/newsletters", async (
    CreateNewsletterRequest request,
    Supabase.Client client) =>
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
    }
);

//GET ALL
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



//GET
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

//DELETE
app.MapDelete("/newsletters/{id}", async (long id, Supabase.Client client) =>
{
    await client
        .From<Newsletter>()
        .Where(n => n.Id == id)
        .Delete();

    return Results.Ok();
});

app.UseHttpsRedirection();
app.Run();