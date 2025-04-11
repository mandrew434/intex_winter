using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace intex_winter.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
            {
                return BadRequest("Role name cannot be empty.");
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (roleExists)
            {
                return Conflict("Role already exists.");
            }

            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
            if (result.Succeeded)
            {
                return Ok($"Role '{roleName}' created successfully.");
            }

            return StatusCode(500, "An error occurred while creating the role.");
        }

        [HttpPost("AssignRoleToUser")]
        public async Task<IActionResult> AssignRoleToUser(string userEmail, string roleName)
        {
            if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
            {
                return BadRequest("User email and role name are required.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                return NotFound("Role does not exist.");
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok($"Role '{roleName}' assigned to user '{userEmail}'.");
            }

            return StatusCode(500, "An error occurred while assigning the role.");
        }

        // Endpoint to show every user and their roles
        [HttpGet("GetUsersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var users = _userManager.Users.ToList();
            var userRolesList = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userRolesList.Add(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    Roles = roles
                });
            }

            return Ok(userRolesList);
        }

        // Endpoint to delete a role by name
        [HttpDelete("DeleteRole")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
            {
                return BadRequest("Role name is required.");
            }

            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound("Role not found.");
            }

            // Optionally, you might want to check if any users are assigned the role here

            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok($"Role '{roleName}' deleted successfully.");
            }

            return StatusCode(500, "An error occurred while deleting the role.");
        }

        // New endpoint to update an existing role's name
        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole(string currentRoleName, string newRoleName)
        {
            if (string.IsNullOrWhiteSpace(currentRoleName) || string.IsNullOrWhiteSpace(newRoleName))
            {
                return BadRequest("Both current role name and new role name are required.");
            }

            var role = await _roleManager.FindByNameAsync(currentRoleName);
            if (role == null)
            {
                return NotFound("Role not found.");
            }

            // Check if a role with the new name already exists
            var roleExists = await _roleManager.RoleExistsAsync(newRoleName);
            if (roleExists)
            {
                return Conflict("A role with the new role name already exists.");
            }

            // Update the role name
            role.Name = newRoleName;
            var result = await _roleManager.UpdateAsync(role);
            if (result.Succeeded)
            {
                return Ok($"Role name updated successfully from '{currentRoleName}' to '{newRoleName}'.");
            }

            return StatusCode(500, "An error occurred while updating the role.");
        }

        // New endpoint to update a user's role assignment (swap one role for another)
        [HttpPut("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole(string userEmail, string currentRole, string newRole)
        {
            if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(currentRole) || string.IsNullOrWhiteSpace(newRole))
            {
                return BadRequest("User email, current role, and new role are required.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            if (!userRoles.Contains(currentRole))
            {
                return NotFound($"User does not have the role '{currentRole}'.");
            }

            var newRoleExists = await _roleManager.RoleExistsAsync(newRole);
            if (!newRoleExists)
            {
                return NotFound("New role does not exist.");
            }

            // Remove the current role from the user
            var removeResult = await _userManager.RemoveFromRoleAsync(user, currentRole);
            if (!removeResult.Succeeded)
            {
                return StatusCode(500, "An error occurred while removing the current role.");
            }

            // Add the new role to the user
            var addResult = await _userManager.AddToRoleAsync(user, newRole);
            if (!addResult.Succeeded)
            {
                return StatusCode(500, "An error occurred while assigning the new role.");
            }

            return Ok($"User '{userEmail}' updated from role '{currentRole}' to '{newRole}' successfully.");
        }

        // New endpoint to remove a role assignment from a user
        [HttpDelete("RemoveUserRole")]
        public async Task<IActionResult> RemoveUserRole(string userEmail, string roleName)
        {
            if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
            {
                return BadRequest("User email and role name are required.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            if (!userRoles.Contains(roleName))
            {
                return NotFound($"User does not have role '{roleName}'.");
            }

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Ok($"Role '{roleName}' removed from user '{userEmail}' successfully.");
            }

            return StatusCode(500, "An error occurred while removing the role from the user.");
        }
    }
}
