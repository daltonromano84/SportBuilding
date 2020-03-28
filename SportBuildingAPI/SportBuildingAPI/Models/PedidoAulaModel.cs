using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SportBuildingAPI.Models
{
    public class PedidoAulaModel
    {
        public int ID { get; set; }
        public Nullable<int> IDProfissional { get; set; }
        public string NomeProfissional { get; set; }
        public Nullable<int> IDCondominio { get; set; }
        public string NomeCondominio { get; set; }
        public string Endereco { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string NomeResponsavel { get; set; }
        public string Data { get; set; }
        public string Hora { get; set; }

    }
}