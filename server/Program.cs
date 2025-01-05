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
using YourNamespace.Models;
using YourNamespace.Contracts;

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
    var domain = "http://localhost:3000"; // change this later

    // Read cart details from the request body
    var body = await context.Request.ReadFromJsonAsync<CartRequest>();

    // Error handling
    if (body == null || body.Cart == null || !body.Cart.Any())
    {
        context.Response.StatusCode = 400;
        await context.Response.WriteAsJsonAsync(new { error = "Cart is empty or invalid." });
        return;
    }

    // Map cart details to Stripe LineItems
    var lineItems = body.Cart.Select(item => new SessionLineItemOptions
    {
        PriceData = new SessionLineItemPriceDataOptions
        {
            Currency = "usd",
            ProductData = new SessionLineItemPriceDataProductDataOptions
            {
                Name = item.Name,
                Description = item.Description 
            },
            UnitAmount = item.Price * 100,
        },
        Quantity = item.Quantity,
    }).ToList();

    // Create a Stripe session with the dynamically generated LineItems
    var options = new SessionCreateOptions
    {
        LineItems = lineItems,
        Mode = "payment",
        SuccessUrl = $"{domain}/checkout-success?session_id={{CHECKOUT_SESSION_ID}}",
        CancelUrl = $"{domain}/cart",
        AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
    };

    var service = new SessionService();
    var session = service.Create(options);

    context.Response.ContentType = "application/json";
    await context.Response.WriteAsJsonAsync(new { url = session.Url });
});

app.UseHttpsRedirection();
app.Run();