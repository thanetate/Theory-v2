using Swashbuckle.AspNetCore.SwaggerGen;
using Supabase;
using Supabase.Interfaces;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//connect to supabase
builder.Services.AddScoped<Supabase.Client>(_ =>

    new Supabase.Client(
        builder.Configuration["SupabaseUrl"],
        builder.Configuration["SupabaseKey"],
        new SupabaseOptions {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }
    )
);


var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//endpoints
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
//GET
app.MapGet("/newsletters/{id}", async (long id, Supabase.Client client) =>
{
    var response = await client
        .From<Newsletter>()
        .Where(n => n.Id == id)
        .Get();
    
    var newsletter = response.Models.FirstOrDefault();

    if(newsletter == null)
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