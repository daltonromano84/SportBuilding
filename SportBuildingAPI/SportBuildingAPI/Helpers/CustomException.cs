
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SportBuildingAPI.Helpers
{
    public class CustomException : Exception
    {
        public CustomException(string mensagem)
        {
            Mensagem = mensagem;
        }
        public string Mensagem { get; set; }
    }

}