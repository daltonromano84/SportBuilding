using RestSharp;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Linq;
using System.Web;
using SportBulidingDomain.Entities;

namespace SportBuildingAPI.Helpers
{
    public class SessionManager
    {

        const string UserKey = "usuarioLogado";

        const string UsuarioModelKey = "UsuarioModel_Key";
        const string ModuloModelKey = "ModuloModel_Key";

        //public static avaColaborador colaborador
        //{
        //    get { return HttpContext.Current.Session[UserKey] != null ? (avaColaborador)HttpContext.Current.Session[UserKey] : null; }
        //    set { HttpContext.Current.Session[UserKey] = value; }
        //}


    }
}