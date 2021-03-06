#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AFI_Project.Data;
using AFI_Project.Models;

namespace AFI_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BadgeController : ControllerBase
    {
        private readonly Database _context;

        public BadgeController(Database context)
        {
            _context = context;
        }

        // GET: api/Badge
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BadgeModel>>> GetBadges()
        {
            return await _context.Badges.ToListAsync();
        }

        [HttpGet("image/{id}")]
		public async Task<IActionResult> GetBadgePicture(int id)
		{
			//if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			var bm = await _context.Badges.FindAsync(id);

			if (bm == null)
			{
				return NotFound();
			}

			var img = System.IO.File.OpenRead(System.IO.Directory.GetCurrentDirectory() + bm.Ba_Img);

			return File(img, "image/jpeg");
		}

        // POST: api/Badge/profile/profilid/badge/badgeid
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("profile/{profile}/badge/{badge}")]
        public async Task<ActionResult<BadgeModel>> PostBadgeProfileModel(int profile, int badge)
        {
            ProfileBadgesModel pbm = new ProfileBadgesModel();
            pbm.Ba_Id = badge;
            pbm.Pr_Id = profile;
            pbm.Pr_Ba_DateRecieved = DateTime.Now;

            _context.ProfileBadges.Add(pbm);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // GET: api/Badge/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BadgeModel>> GetBadgeModel(int id)
        {
            var badgeModel = await _context.Badges.FindAsync(id);

            if (badgeModel == null)
            {
                return NotFound();
            }

            return badgeModel;
        }

        // PUT: api/Badge/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBadgeModel(int id, BadgeModel badgeModel)
        {
            if (id != badgeModel.Ba_Id)
            {
                return BadRequest();
            }

            _context.Entry(badgeModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BadgeModelExists(id))
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

        // POST: api/Badge
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BadgeModel>> PostBadgeModel(BadgeModel badgeModel)
        {
            _context.Badges.Add(badgeModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBadgeModel", new { id = badgeModel.Ba_Id }, badgeModel);
        }

        // DELETE: api/Badge/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBadgeModel(int id)
        {
            var badgeModel = await _context.Badges.FindAsync(id);
            if (badgeModel == null)
            {
                return NotFound();
            }

            _context.Badges.Remove(badgeModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BadgeModelExists(int id)
        {
            return _context.Badges.Any(e => e.Ba_Id == id);
        }
    }
}
