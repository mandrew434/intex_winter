using System.Security.Claims;
using System.Text.Json;
using intex_winter.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using intex_winter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
        opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add both application data and identity data contexts
builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MoviesConnection")));
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));
builder.Services.AddDbContext<ContentDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContentConnection")));
builder.Services.AddDbContext<CollaborativeDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CollaborativeConnection")));

builder.Services.AddAuthorization();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();


// Password customization
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Map email to name
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 12;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequiredUniqueChars = 0;
});
// Prevent email confirmation requirement
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();
// Optional: Use a custom claims factory (if you want to add roles, email, etc.)
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// Cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None; // for localhost dev with frontend. change after ading https for production
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";

    // Set the cookie expiration time to 30 minutes.
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    // Optionally, enable sliding expiration so that the user remains logged in if they're active.
    options.SlidingExpiration = true;
});


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000","https://blue-ocean-0062bc71e.6.azurestaticapps.net","intex-winter.database.windows.net", "https://www.cineniche.online")
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader();



    });
});
var app = builder.Build();
// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use(async (context, next) =>
{
    context.Response.OnStarting(() =>
    {
        context.Response.Headers.Remove("Server");
        return Task.CompletedTask;
    });
    await next();
});


// Middleware
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapGet("/login", () =>
{
    return Results.Json(new { message = "Please log in via the proper client flow." });
});


// Logout route
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Clear the authentication cookie manually
    // This is important to ensure the cookie is removed from the client.
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();
// Ping auth route for checking logged-in status
// ...existing code...
app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

app.Run();