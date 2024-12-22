using Microsoft.Extensions.WebEncoders.Testing;
using Supabase.Tutorial.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
Console.WriteLine("Mapping OpenAPI...");
builder.Services.AddOpenApi();

//add CORS 
builder.Services.AddCors(options => {
    options.AddPolicy("AllowViteClient",
    policy => policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

//supabase
var url = "https://wpbpraqupetwahqthuyg.supabase.co";
var key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYnByYXF1cGV0d2FocXRodXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODkzODUsImV4cCI6MjA1MDQ2NTM4NX0.69TUDB6EKfPloIOR9OrC2-s7-7G61ht-jZAfI6KExro";

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();

// A result can be fetched like so.
var result = await supabase.From<Test>().Get();
var cities = result.Models;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

//use the CORS policy
app.UseCors("AllowViteClient");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
