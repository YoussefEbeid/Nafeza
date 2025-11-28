using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nafeza.Application.DTOs;
using Nafeza.Application.Features.ACI.Commands;
using Nafeza.Application.Features.ACI.Queries;
using System.Threading.Tasks;

namespace Nafeza.API.Controllers
{
    [Authorize]
    public class AciController : ApiControllerBase
    {
        // 1. Create Draft
        [HttpPost("draft")]
        public async Task<ActionResult<int>> CreateDraft([FromBody] CreateAciCommand command)
        {
            var requestId = await Mediator.Send(command);
            return Ok(new { RequestId = requestId, Message = "Draft created successfully." });
        }

        // 2. Get Status
        [HttpGet("{id}")]
        public async Task<ActionResult<AcidRequestDto>> GetStatus(int id)
        {
            var query = new GetAciStatusQuery { RequestId = id };
            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound(new { Message = "ACID Request not found." });

            return Ok(result);
        }

        // 3. Upload Invoice (Simulation)
        [HttpPost("{id}/upload-invoice")]
        [AllowAnonymous]
        public async Task<IActionResult> UploadInvoice(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Fake processing time
            await Task.Delay(800);

            var mockResult = new
            {
                Message = "Invoice Processed Successfully",
                TotalLines = 2,
                TotalValueUSD = 15000.50,
                Items = new[]
                {
                    new { HSCode = "851713", Description = "iPhone 15 Pro", Quantity = 100, Value = 10000.0 },
                    new { HSCode = "847130", Description = "MacBook Air", Quantity = 10, Value = 5000.50 }
                }
            };

            return Ok(mockResult);
        }
    }
}