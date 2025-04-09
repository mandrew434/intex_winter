using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace intex_winter.Controllers
{
    public class GoogleAuthRequest
    {
        public string IdToken { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(UserManager<IdentityUser> userManager,
                              SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("google")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleSignIn([FromBody] GoogleAuthRequest request)
        {
            if (string.IsNullOrEmpty(request.IdToken))
            {
                return BadRequest(new { message = "Token is missing" });
            }

            // Validate the ID token using Google's library.
            GoogleJsonWebSignature.Payload payload;
            try
            {
                // ValidateAsync checks the token's integrity and expiry.
                payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Token validation failed: " + ex.Message });
            }

            // Look up a user by the external provider key (Google's "sub" claim)
            var userLoginInfo = new UserLoginInfo("Google", payload.Subject, "Google");
            var user = await _userManager.FindByLoginAsync(userLoginInfo.LoginProvider, userLoginInfo.ProviderKey);

            // If the user doesn't exist, create a new account.
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new IdentityUser
                    {
                        UserName = payload.Email,
                        Email = payload.Email,
                    };
                    var createResult = await _userManager.CreateAsync(user);
                    if (!createResult.Succeeded)
                    {
                        return BadRequest(new { message = "Could not create user", errors = createResult.Errors });
                    }
                }
                // Add the external login info.
                var addLoginResult = await _userManager.AddLoginAsync(user, userLoginInfo);
                if (!addLoginResult.Succeeded)
                {
                    return BadRequest(new { message = "Could not add external login", errors = addLoginResult.Errors });
                }
            }

            // Sign in the user.
            await _signInManager.SignInAsync(user, isPersistent: false);

            // You could return a JWT, a cookie, or simply a success message.
            return Ok(new { message = "Login successful" });
        }
    }
}
