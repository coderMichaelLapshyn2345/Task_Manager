using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerWebApplication.Models;

namespace TaskManagerWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformersController : ControllerBase
    {
        private readonly TaskManagerContext _context;

        public PerformersController(TaskManagerContext context)
        {
            _context = context;
        }

        // GET: api/Performers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Performer>>> GetPerformers()
        {
          if (_context.Performers == null)
          {
              return NotFound();
          }
            return await _context.Performers.ToListAsync();
        }

        // GET: api/Performers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Performer>> GetPerformer(int id)
        {
          if (_context.Performers == null)
          {
              return NotFound();
          }
            var performer = await _context.Performers.FindAsync(id);

            if (performer == null)
            {
                return NotFound();
            }

            return performer;
        }

        // PUT: api/Performers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerformer(int id, Performer performer)
        {
            if (id != performer.ID)
            {
                return BadRequest();
            }

            _context.Entry(performer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PerformerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Performers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Performer>> PostPerformer(Performer performer)
        {
          if (_context.Performers == null)
          {
              return Problem("Entity set 'TaskManagerContext.Performers'  is null.");
          }
            _context.Performers.Add(performer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerformer", new { id = performer.ID }, performer);
        }

        // DELETE: api/Performers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerformer(int id)
        {
            if (_context.Performers == null)
            {
                return NotFound();
            }
            var performer = await _context.Performers.FindAsync(id);
            if (performer == null)
            {
                return NotFound();
            }

            _context.Performers.Remove(performer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PerformerExists(int id)
        {
            return (_context.Performers?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
