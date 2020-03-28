using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(SportBuildingAPI.Startup))]

namespace SportBuildingAPI
{
    public partial class Startup
    {

       
        public void Configuration(IAppBuilder app)
        {

            // configuracao WebApi
            var config = new HttpConfiguration();

            // ativando cors
            app.UseCors(CorsOptions.AllowAll);
            // ativando configuração WebApi
            app.UseWebApi(config);

            //Cria se não existem as Roles
            //IdentityRoleHelper.DefaultRoles();

            //HttpConfiguration config = new HttpConfiguration();
            //var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            //config.EnableCors(cors);

            ConfigureAuth(app);
        }
    }
}
