using Microsoft.AspNetCore.Identity;

namespace intex_winter.Data
{
    

    public class ApplicationUser : IdentityUser
    {
        // This is the foreign key that you'll use in your recommender table:
        public int? DomainUserId { get; set; }
    }
}
