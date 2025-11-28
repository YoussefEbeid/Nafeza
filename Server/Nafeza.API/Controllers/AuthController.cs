using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nafeza.Application.DTOs.Auth;
using Nafeza.Application.Features.Auth.Commands;

namespace Nafeza.API.Controllers
{
    public class AuthController : ApiControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginCommand command)
        {
            // We just pass the command to the "Brain" (Application Layer)
            // The Controller doesn't know about Databases or JWTs.
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        // Endpoint to check if the USB e-Token is connected (Mock)
        [HttpGet("check-etoken")]
        public IActionResult CheckEToken()
        {
            // For the interview demo, we always say "Connected"
            return Ok(new { Status = "Connected", SerialNumber = "USB-TOKEN-998877" });
        }
    }
}