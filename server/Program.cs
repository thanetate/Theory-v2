using Swashbuckle.AspNetCore.SwaggerGen;
using Supabase;
using Supabase.Interfaces;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

// initialize the web application
var builder = WebApplication.CreateBuilder(args);

// adds services to the dependency injection container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

// add Authentication
var bytes = Encoding.UTF8.GetBytes(builder.Configuration["JwtSecret"]!);
builder.Services.AddAuthentication().AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(bytes),
        ValidAudience = builder.Configuration["ValidAudience"],
        ValidIssuer = builder.Configuration["ValidIssuer"]
    };
});

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
app.MapUserEndpoints();

// test auth endpoint
app.MapGet("/user", (ClaimsPrincipal principal) => 
{
    var claims = principal.Claims.ToDictionary(c => c.Type, c => c.Value);

    return Results.Ok(claims);
})
.RequireAuthorization();


app.UseHttpsRedirection();
app.Run();