using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RestSharp;
using SportBuildingAPI.Helpers;
using SportBuildingAPI.Models;
using SportBulidingDomain.Entities;

namespace SportBuildingAPI.Controllers
{



    [RoutePrefix("api/Profissional")]
    public class ProfissionalController : ApiController
    {
        string url = ConfigurationManager.AppSettings["urlAPI"];
        private SportBuildingEntities db = new SportBuildingEntities();
        private ApplicationUserManager _userManager;
       private static RestClient client = new RestClient("https://localhost:44324/api/Account/register");
  



        // GET: api/Profissional
        public IQueryable<Profissionais> GetProfissionais()
        {
            return db.Profissionais;
        }

        // GET: api/Profissional/5
        [ResponseType(typeof(Profissionais))]
        public async Task<IHttpActionResult> GetProfissionais(int id)
        {
            Profissionais profissionais = await db.Profissionais.FindAsync(id);
            if (profissionais == null)
            {
                return NotFound();
            }

            return Ok(profissionais);
        }

        // GET: api/Profissional/5
        [ResponseType(typeof(Profissionais))]
        public async Task<IHttpActionResult> GetProfissionalPorLogin(string strUserName)
        {
            var query = await (from prof in db.VW_ProfissionaisDadosCruzados
                               where prof.UserName.ToLower().Trim() == strUserName.ToLower().Trim()
                               select new
                               {
                                   prof.ID,
                                   prof.Nome,
                                   prof.Idade,
                                   prof.Email,
                                   prof.UserName,
                                   prof.Bairro,
                                   prof.Sexo,
                                   prof.Endereco,
                                   prof.NumeroRegistro,
                                   prof.Especialidades,
                                   prof.Roles,
                                   prof.Comentario,
                                   prof.IDCondominio
                                   


                               }).ToListAsync();

            List<ProfissionalModel> lista = new List<ProfissionalModel>();

            foreach (var item in query)
            {
                var model = new ProfissionalModel()
                {
                    ID = item.ID,
                    Nome = item.Nome,
                    Idade = item.Idade,
                    Email = item.Email,
                    UserName = item.UserName,
                    Bairro = item.Bairro,
                    Sexo = item.Sexo,
                    Endereco = item.Endereco,
                    NumeroRegistro = item.NumeroRegistro,
                    Especialidades = item.Especialidades,
                    Roles = item.Roles,
                    Comentario = item.Comentario,
                    IDCondominio = item.IDCondominio
                    

                };
                lista.Add(model);
            }


        

            return Ok(lista);
        }


        [HttpGet]
        [Route("MediaNota")]
        public IEnumerable<VW_NotasProfissionais> GetMediaNota(int IdProfissional)
        {
            var query = (from m in db.VW_NotasProfissionais.Where(x => x.ID.Equals(IdProfissional))



                         select new
                         {
                           IDProfissional = m.ID,
                           m.MediaNota

                         }).ToList();

            List<VW_NotasProfissionais> listMedias= new List<VW_NotasProfissionais>();
            var model = new VW_NotasProfissionais();
            foreach (var registro in query)
            {

                model = new VW_NotasProfissionais()
                {

                    ID = registro.IDProfissional,
                    MediaNota = registro.MediaNota 

                };
                listMedias.Add(model);



            }
            return listMedias;
        }


        [HttpGet]
        [Route("ProfissionaisPorEspecialidadeBairro")]
        public IEnumerable<VW_ListaProfissionais> GetProfissionaisPorEspecialidadeBairro(int IdEspecialidade, int idBairro)
        {
            var query = (from m in db.VW_ListaProfissionais.
                         Where(x => x.IDEspecialidade.Equals(IdEspecialidade) && x.IDBairro.Equals(idBairro))
                                                 
                         select new
                         {
                             m.IDProfissional,
                             m.NomeProfissional,
                             m.Idade,
                             m.Sexo,
                             m.UserName,
                             m.Especialidades,
                             m.Bairro,
                             m.QtdAulas,
                             m.MediaNotas

                         }).ToList();

            List<VW_ListaProfissionais> listProf = new List<VW_ListaProfissionais>();
            var model = new VW_ListaProfissionais();
            foreach (var registro in query)
            {

                model = new VW_ListaProfissionais()
                {
                   IDProfissional = registro.IDProfissional,
                  NomeProfissional = registro.NomeProfissional,
                  Idade =registro.Idade,
                  Sexo =  registro.Sexo,
                  UserName = registro.UserName,
                  Especialidades = registro.Especialidades,
                  Bairro = registro.Bairro,
                  QtdAulas = registro.QtdAulas,
                  MediaNotas = registro.MediaNotas

                };
                listProf.Add(model);



            }
            return listProf;
        }


        // PUT: api/Profissional/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProfissionais(int id, Profissionais profissionais)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != profissionais.ID)
            {
                return BadRequest();
            }

            db.Entry(profissionais).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfissionaisExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
       // [HttpOptions] 
        // POST: api/Profissional
        [ResponseType(typeof(Profissionais))]
        public async Task<IHttpActionResult> PostProfissionais(ProfissionalModel modelEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Profissionais profissional = new Profissionais
            {
                Nome = modelEntrada.Nome,
                Email = modelEntrada.Email,
                IDPais = 1,
                IDCidade=1,
                IDUF=1,
                IDBairro = modelEntrada.IDBairro,
                Endereco = modelEntrada.Endereco,
                NumeroRegistro = modelEntrada.NumeroRegistro,
                Idade = modelEntrada.Idade,
                UserName = modelEntrada.UserName,
                Sexo = modelEntrada.Sexo,
                Comentario = modelEntrada.Comentario


            };




            db.Profissionais.Add(profissional);
            await db.SaveChangesAsync();

            foreach (var item in modelEntrada.ListaEspecialidades)
            {
                ProfissionalEspecialidades especialidades = new ProfissionalEspecialidades
                {   

                    IDEspecialidade = item.ID,
                    IDProfissional =  profissional.ID


                };
                db.ProfissionalEspecialidades.Add(especialidades);
            }
            await db.SaveChangesAsync();


            //Prepara o Objeto com os dados do profisisonal para cadastrar usuário
            var objUserRegistro = new RegisterBindingModel()
            {


                Id = profissional.ID.ToString(),
                UserName = modelEntrada.UserName.Trim(),
                Email = modelEntrada.Email.Trim(),
                //  Password = modelEntrada.Senha,
                Password = modelEntrada.Senha,
                ConfirmPassword = modelEntrada.Senha,
                 Roles = modelEntrada.Roles,
                //ADM = modelEntrada.ADM,
                //Gestor = modelEntrada.Gestor,
                //Interno = true
            };

            //Registra usuário na AspNetUser
           
        RestRequest request = new RestRequest(Method.POST);
            request.AddJsonBody(objUserRegistro);
            var resultAccount = client.Execute(request);

           //  var resultAccount = RestHelper.Post(url, "api/Account/Register", objUserRegistro);

            if (resultAccount.IsSuccessful == false) { throw new ApplicationException(string.Concat("Falha na criação de Usuário", resultAccount.Content)); }


            return CreatedAtRoute("DefaultApi", new { id = profissional.ID }, profissional);
        }

        // DELETE: api/Profissional/5
        [ResponseType(typeof(Profissionais))]
        public async Task<IHttpActionResult> DeleteProfissionais(int id)
        {
            Profissionais profissionais = await db.Profissionais.FindAsync(id);
            if (profissionais == null)
            {
                return NotFound();
            }

            db.Profissionais.Remove(profissionais);
            await db.SaveChangesAsync();

            return Ok(profissionais);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProfissionaisExists(int id)
        {
            return db.Profissionais.Count(e => e.ID == id) > 0;
        }
    }
}