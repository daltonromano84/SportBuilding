using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SportBulidingDomain.Entities;

namespace SportBuildingAPI.Controllers
{
    public class BairroController : ApiController
    {
        private SportBuildingEntities db = new SportBuildingEntities();

        // GET: api/Bairro
        public IQueryable<Bairro> GetBairro()
        {
            return db.Bairro;
        }

        // GET: api/Bairro/5
        [ResponseType(typeof(Bairro))]
        public async Task<IHttpActionResult> GetBairro(int id)
        {
            Bairro bairro = await db.Bairro.FindAsync(id);
            if (bairro == null)
            {
                return NotFound();
            }

            return Ok(bairro);
        }

        // PUT: api/Bairro/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBairro(int id, Bairro bairro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bairro.ID)
            {
                return BadRequest();
            }

            db.Entry(bairro).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BairroExists(id))
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

        // POST: api/Bairro
        [ResponseType(typeof(Bairro))]
        public async Task<IHttpActionResult> PostBairro(Bairro bairro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bairro.Add(bairro);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BairroExists(bairro.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = bairro.ID }, bairro);
        }

        // DELETE: api/Bairro/5
        [ResponseType(typeof(Bairro))]
        public async Task<IHttpActionResult> DeleteBairro(int id)
        {
            Bairro bairro = await db.Bairro.FindAsync(id);
            if (bairro == null)
            {
                return NotFound();
            }

            db.Bairro.Remove(bairro);
            await db.SaveChangesAsync();

            return Ok(bairro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BairroExists(int id)
        {
            return db.Bairro.Count(e => e.ID == id) > 0;
        }
    }
}