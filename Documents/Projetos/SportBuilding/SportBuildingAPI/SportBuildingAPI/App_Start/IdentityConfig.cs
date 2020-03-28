using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using SportBuildingAPI.Models;

namespace SportBuildingAPI
{
    // Configure o gerenciador de usuários do aplicativo usado nesse aplicativo. O UserManager está definido no ASP.NET Identity e é usado pelo aplicativo.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<AppUsersDbContext>()));
            // Configurar a lógica de validação para nomes de usuário
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configurar a lógica de validação para senhas
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;


        }

        /// <summary>
        /// The role manager used by the application to store roles and their connections to users
        /// </summary>
        public class ApplicationRoleManager : RoleManager<IdentityRole>
        {
            public ApplicationRoleManager(IRoleStore<IdentityRole, string> roleStore)
                : base(roleStore)
            {
            }

            public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
            {
                ///It is based on the same context as the ApplicationUserManager
                var appRoleManager = new ApplicationRoleManager(new RoleStore<IdentityRole>(context.Get<AppUsersDbContext>()));

                return appRoleManager;
            }
        }
        //public class ApplicationUser : IdentityUser
        //{
        //    // Property used for soft deleting users
        //    public bool IsDeleted { get; set; }
        //    public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        //    {
        //        // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
        //        var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
        //        // Add custom user claims here
        //        return userIdentity;
        //    }
        //}
    }
}
