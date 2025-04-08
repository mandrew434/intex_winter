//using System.Security.Claims;
//using intex_winter.Data;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<MoviesContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("MoviesConnection")));

//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

//builder.Services.AddAuthorization();

////Password customization
//builder.Services.Configure<IdentityOptions>(options =>
//{
//    // Customize your password requirements here
//    options.Password.RequireDigit = false;
//    options.Password.RequiredLength = 12;           
//    options.Password.RequireNonAlphanumeric = false; 
//    options.Password.RequireUppercase = false;
//    options.Password.RequireLowercase = false;
//    options.Password.RequiredUniqueChars = 0;
//});

////Identity Builder to allow roles
//builder.Services.AddIdentity<IdentityUser, IdentityRole>()
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();

//// ALlows for role creation without the email confirmation
//builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

//builder.Services.ConfigureApplicationCookie(options =>
//{
//    options.Cookie.HttpOnly = true;
//    options.Cookie.SameSite = SameSiteMode.None; // change after adding https for production
//    options.Cookie.Name = ".AspNetCore.Identity.Application";
//    options.LoginPath = "/login";
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
//});



//// Configure CORS policy
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowFrontend",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:3000") // Replace with your frontend URL
//                .AllowCredentials() // Required to allow cookies
//                .AllowAnyMethod()
//                .AllowAnyHeader();
//        });
//});

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseCors("AllowFrontend");



////app.UseAuthentication();
////app.UseAuthorization();



//app.MapControllers();

//app.MapIdentityApi<IdentityUser>();

//app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
//{
//    await signInManager.SignOutAsync();

//    // Ensure authentication cookie is removed
//    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
//    {
//        HttpOnly = true,
//        Secure = true,
//        SameSite = SameSiteMode.None
//    });

//    return Results.Ok(new { message = "Logout successful" });
//}).RequireAuthorization();

//app.Run();


using System.Security.Claims;
using intex_winter.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using intex_winter.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add both application data and identity data contexts
builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MoviesConnection")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

// Identity with API endpoints and roles
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthorization();

// Optional: Use a custom claims factory (if you want to add roles, email, etc.)
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

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

// Cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None; // for localhost dev with frontend. change after ading https for production
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

// Logout route
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// Ping auth route for checking logged-in status
app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    return Results.Json(new { email = email });
}).RequireAuthorization();

app.Run();
