using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SportBuildingAPI.Models
{
    public class CondominioModel
    {

        public int ID { get; set; }
        public string CNPJ { get; set; }
        public string NomeCondominio { get; set; }
        public string Email { get; set; }
        public Nullable<int> IDPais { get; set; }
        public Nullable<int> IDCidade { get; set; }
        public Nullable<int> IDUF { get; set; }
        public string IDBairro { get; set; }
        public string Endereco { get; set; }
        public string Celular { get; set; }
        public string NomeResponsavel { get; set; }
        public long IDRole { get; set; }
        public string Roles { get; set; }
        public string UserName { get; set; }

        public string Senha { get; set; }

        public string ConfirmeSenha { get; set; }

        public string Token { get; set; }
    }
}