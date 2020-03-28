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
    public class EspecialidadeController : ApiController
    {
        private SportBuildingEntities db = new SportBuildingEntities();

        // GET: api/Especialidade
        public IQueryable<Especialidades> GetEspecialidades()
        {
            return db.Especialidades;
        }

        // GET: api/Especialidade/5
        [ResponseType(typeof(Especialidades))]
        public async Task<IHttpActionResult> GetEspecialidades(int id)
        {
            Especialidades especialidades = await db.Especialidades.FindAsync(id);
            if (especialidades == null)
            {
                return NotFound();
            }

            return Ok(especialidades);
        }

        // PUT: api/Especialidade/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEspecialidades(int id, Especialidades especialidades)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != especialidades.ID)
            {
                return BadRequest();
            }

            db.Entry(especialidades).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EspecialidadesExists(id))
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

        // POST: api/Especialidade
        [ResponseType(typeof(Especialidades))]
        public async Task<IHttpActionResult> PostEspecialidades(Especialidades especialidades)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Especialidades.Add(especialidades);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = especialidades.ID }, especialidades);
        }

        // DELETE: api/Especialidade/5
        [ResponseType(typeof(Especialidades))]
        public async Task<IHttpActionResult> DeleteEspecialidades(int id)
        {
            Especialidades especialidades = await db.Especialidades.FindAsync(id);
            if (especialidades == null)
            {
                return NotFound();
            }

            db.Especialidades.Remove(especialidades);
            await db.SaveChangesAsync();

            return Ok(especialidades);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EspecialidadesExists(int id)
        {
            return db.Especialidades.Count(e => e.ID == id) > 0;
        }
    }
}