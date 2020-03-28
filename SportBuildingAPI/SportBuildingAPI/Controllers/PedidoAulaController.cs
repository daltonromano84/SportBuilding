using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SportBuildingAPI.Models;
using SportBulidingDomain.Entities;

namespace SportBuildingAPI.Controllers
{
    public class PedidoAulaController : ApiController
    {
        private SportBuildingEntities db = new SportBuildingEntities();

        // GET: api/PedidoAula
        public IQueryable<PedidoAula> GetPedidoAula()
        {
            return db.PedidoAula;
        }

        // GET: api/PedidoAula/5
        [ResponseType(typeof(PedidoAula))]
        public async Task<IHttpActionResult> GetPedidoAula(int id)
        {
            PedidoAula pedidoAula = await db.PedidoAula.FindAsync(id);
            if (pedidoAula == null)
            {
                return NotFound();
            }

            return Ok(pedidoAula);
        }


        [HttpGet]
        [Route("api/Pedidoaula/PedidoAulaPorProfissional")]
        public async Task<IHttpActionResult> GetPedidoAulaPorProfissional(int IdProfissional)
        {
            var query = await (from aula in db.PedidoAula join prof in db.Profissionais
                                                            on aula.IDProfissional equals prof.ID
                                                           join cond in db.Condominios
                                                           on aula.IDCondominio equals cond.ID
                                                           where prof.ID.Equals(IdProfissional)
                                                           orderby aula.Data descending
                               select new
                               {
                                  IDProfissional =  prof.ID,
                                  NomeProfissional = prof.Nome,
                                  cond.NomeCondominio,
                                  cond.Endereco,
                                  cond.Celular,
                                  cond.Email,
                                  cond.NomeResponsavel,
                                  aula.Data
                           



                               }).Take(5).ToListAsync();

            List<PedidoAulaModel> lista = new List<PedidoAulaModel>();

            foreach (var item in query)
            {
                var model = new PedidoAulaModel()
                {
                    IDProfissional = item.IDProfissional,
                    NomeProfissional = item.NomeProfissional,
                    NomeCondominio = item.NomeCondominio,
                    Endereco = item.Endereco,
                    Celular = item.Celular,
                    Email = item.Email,
                    NomeResponsavel = item.NomeResponsavel,
                    Data = item.Data.Value.Date.ToString("dd/MM/yyyy"),
                    Hora = item.Data.Value.ToString("HH:mm")


                };
                lista.Add(model);
            }




            return Ok(lista);
        }


        // PUT: api/PedidoAula/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPedidoAula(int id, PedidoAula pedidoAula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pedidoAula.ID)
            {
                return BadRequest();
            }

            db.Entry(pedidoAula).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoAulaExists(id))
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

        // POST: api/PedidoAula
        [ResponseType(typeof(PedidoAula))]
        public async Task<IHttpActionResult> PostPedidoAula(PedidoAulaModel modelEntrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var data = DateTime.Now.Date;
            var hora = modelEntrada.Hora;

            PedidoAula pedidoAula = new PedidoAula
            {

                IDCondominio = modelEntrada.IDCondominio,
                IDProfissional = modelEntrada.IDProfissional,
              //  Data = DateTime.ParseExact(data + " " + hora, "yyyy-MM-dd hh:mm:ss tt", CultureInfo.InvariantCulture)
                Data = DateTime.Now


        };
           

            db.PedidoAula.Add(pedidoAula);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = pedidoAula.ID }, pedidoAula);
        }

        // DELETE: api/PedidoAula/5
        [ResponseType(typeof(PedidoAula))]
        public async Task<IHttpActionResult> DeletePedidoAula(int id)
        {
            PedidoAula pedidoAula = await db.PedidoAula.FindAsync(id);
            if (pedidoAula == null)
            {
                return NotFound();
            }

            db.PedidoAula.Remove(pedidoAula);
            await db.SaveChangesAsync();

            return Ok(pedidoAula);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PedidoAulaExists(int id)
        {
            return db.PedidoAula.Count(e => e.ID == id) > 0;
        }
    }
}