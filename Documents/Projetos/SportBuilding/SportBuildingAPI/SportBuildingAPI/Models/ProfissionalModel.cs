using SportBulidingDomain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SportBuildingAPI.Models
{
    public class ProfissionalModel
    {

        public int ID { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public string Endereco { get; set; }

        public int IDCondominio { get; set; }

        public int IDBairro { get; set; }
        public string Bairro { get; set; }
        public string NumeroRegistro { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        public string Senha { get; set; }

        public string ConfirmeSenha { get; set; }
        public long IDRole { get; set; }
        public string Roles { get; set; }

        public string Token { get; set; }

        public bool Profissional { get; set; }
        public bool ADM { get; set; }
        public bool Condomino { get; set; }
        public string Sexo { get; set; }
        public int Status { get; set; }

        public string Comentario { get; set; }

        public Nullable<decimal> MediaNotas { get; set; }
        public Nullable<int> QtdAulas { get; set; }

        public List<ProfissionalEspecialidades> ListaEspecialidades { get; set; }
        public string Especialidades { get; set; }
    }
}