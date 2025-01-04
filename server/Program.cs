using Swashbuckle.AspNetCore.SwaggerGen;
using Supabase;
using Supabase.Interfaces;
using Supabase.Tutorial.Contracts;
using Supabase.Tutorial.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Stripe;
using Stripe.Checkout;

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

//connection to supabase
builder.Services.AddScoped<Supabase.Client>(_ =>
{
    var supabaseUrl = builder.Configuration["SupabaseUrl"];
    var supabaseKey = builder.Configuration["SupabaseKey"];

    if (string.IsNullOrEmpty(supabaseUrl))
    {
        throw new ArgumentNullException(nameof(supabaseUrl), "SupabaseUrl cannot be null or empty.");
    }

    if (string.IsNullOrEmpty(supabaseKey))
    {
        throw new ArgumentNullException(nameof(supabaseKey), "SupabaseKey cannot be null or empty.");
    }

    return new Supabase.Client(
        supabaseUrl,
        supabaseKey,
        new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }
    );
});

// stripe configuration
StripeConfiguration.ApiKey = builder.Configuration["StripeSecretKey"];

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
app.MapProductEndpoints();
app.MapUserEndpoints();

// test stripe endpoint
app.MapPost("/create-checkout-session", async (HttpContext context) =>
{
    var domain = "http://localhost:3000";  // Redirect to the client URL
    var options = new SessionCreateOptions
    {
        LineItems = new List<SessionLineItemOptions>
        {
            new SessionLineItemOptions
            {
                Price = "price_1QdcW9HlTIjZxktq1tqJ2ulu",  // Replace this with your actual price_id
                Quantity = 1,
            },
        },
        Mode = "payment",
        SuccessUrl = domain + "?success=true",
        CancelUrl = domain + "?canceled=true",
    };

    var service = new SessionService();
    Session session = service.Create(options);

    context.Response.Headers.Add("Location", session.Url);  // Redirect to the session URL
    return Results.StatusCode(303);  // HTTP 303 Redirect
}).RequireAuthorization();

app.UseHttpsRedirection();
app.Run();