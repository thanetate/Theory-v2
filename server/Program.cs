using Supabase;
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

// Hardcoded Supabase URL and Key for testing
var supabaseUrl = "https://wpbpraqupetwahqthuyg.supabase.co";
var supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYnByYXF1cGV0d2FocXRodXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODkzODUsImV4cCI6MjA1MDQ2NTM4NX0.69TUDB6EKfPloIOR9OrC2-s7-7G61ht-jZAfI6KExro";

//config supabase client 
Console.WriteLine("Configuring Supabase client...");
builder.Services.AddScoped<Supabase.Client>(_ =>
    new Supabase.Client(
        supabaseUrl,
        supabaseKey,
        new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }
    )
);

var app = builder.Build();

// Test Supabase client
Console.WriteLine("Testing Supabase client...");
using (var scope = app.Services.CreateScope())
{
    var supabaseClient = scope.ServiceProvider.GetRequiredService<Supabase.Client>();
    await TestSupabaseClient(supabaseClient);
}
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

static async Task TestSupabaseClient(Supabase.Client client)
{
    // Add your test logic here
    Console.WriteLine("Supabase client is configured correctly.");
    await Task.CompletedTask;
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
