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
using System.Web.Http.Description;
using RestSharp;
using SportBuildingAPI.Models;
using SportBulidingDomain.Entities;

namespace SportBuildingAPI.Controllers
{
    public class CondominioController : ApiController
    {
        string url = ConfigurationManager.AppSettings["urlAPI"];
        private SportBuildingEntities db = new SportBuildingEntities();
        private ApplicationUserManager _userManager;
        private static RestClient client = new RestClient("https://localhost:44324/api/Account/register");

        // GET: api/Condominio
        public IQueryable<Condominios> GetCondominios()
        {
            return db.Condominios;
        }

        // GET: api/Condominio/5
        [ResponseType(typeof(Condominios))]
        public async Task<IHttpActionResult> GetCondominios(int id)
        {
            Condominios condominios = await db.Condominios.FindAsync(id);
            if (condominios == null)
            {
                return NotFound();
            }

            return Ok(condominios);
        }

        // GET: api/Condominios/5
        [ResponseType(typeof(Condominios))]
        public async Task<IHttpActionResult> GetCondominioPorLogin(string strUserName)
        {
            var query = await (from cond in db.VW_ProfissionaisDadosCruzados
                               where cond.UserName.ToLower().Trim() == strUserName.ToLower().Trim()
                               select new
                               {
                                   cond.ID,
                                   cond.NomeCondominio,
                                   cond.CNPJ,
                                   cond.Email,
                                   cond.NomeResponsavel,
                                   cond.Celular,
                                  // cond.IDBairro,
                                   cond.Endereco,
                               
                                
                                 //  cond.Roles,
                                 


                               }).ToListAsync();

            List<CondominioModel> lista = new List<CondominioModel>();

            foreach (var item in query)
            {
                var model = new CondominioModel()
                {
                    ID = item.ID,
                    Celular = item.Celular,
                    CNPJ = item.CNPJ,
                    Email = item.Email,
                    Endereco = item.Endereco,
                    NomeCondominio = item.NomeCondominio,
                    NomeResponsavel = item.NomeResponsavel
                    


                };
                lista.Add(model);
            }




            return Ok(lista);
        }

        // PUT: api/Condominio/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCondominios(int id, Condominios condominios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != condominios.ID)
            {
                return BadRequest();
            }

            db.Entry(condominios).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CondominiosExists(id))
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

        // POST: api/Condominio
        [ResponseType(typeof(Condominios))]
        public async Task<IHttpActionResult> PostCondominios(CondominioModel modelEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            Condominios condominio = new Condominios
            {


                NomeCondominio = modelEntrada.NomeCondominio,
                CNPJ = modelEntrada.CNPJ,
                Email = modelEntrada.Email,
                IDPais = 1,
                IDCidade = 1,
                IDUF = 1,
                IDBairro = modelEntrada.IDBairro,
                Endereco = modelEntrada.Endereco,
                NomeResponsavel = modelEntrada.NomeResponsavel,
                Celular = modelEntrada.Celular

            };


            db.Condominios.Add(condominio);
            await db.SaveChangesAsync();
            //Prepara o Objeto com os dados do profisisonal para cadastrar usuário
            var objUserRegistro = new RegisterBindingModel()
            {


                Id = condominio.ID.ToString(),
                UserName = modelEntrada.Email.Trim(),
                Email = modelEntrada.Email.Trim(),
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

            // var resultAccount = RestHelper.Post(url, "api/Account/Register", objUserRegistro);

            if (resultAccount.IsSuccessful == false) { throw new ApplicationException(string.Concat("Falha na criação de Usuário", resultAccount.Content)); }


            return CreatedAtRoute("DefaultApi", new { id = condominio.ID }, condominio);
        }

        // DELETE: api/Condominio/5
        [ResponseType(typeof(Condominios))]
        public async Task<IHttpActionResult> DeleteCondominios(int id)
        {
            Condominios condominios = await db.Condominios.FindAsync(id);
            if (condominios == null)
            {
                return NotFound();
            }

            db.Condominios.Remove(condominios);
            await db.SaveChangesAsync();

            return Ok(condominios);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CondominiosExists(int id)
        {
            return db.Condominios.Count(e => e.ID == id) > 0;
        }
    }
}