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

//add CORS 
builder.Services.AddCors(options => {
    options.AddPolicy("AllowViteClient",
    policy => policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

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

app.UseCors("AllowViteClient");

// adds swagger UI in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// endpoints
app.MapNewsletterEndpoints();
app.MapProductEndpoints();


app.UseHttpsRedirection();
app.Run();