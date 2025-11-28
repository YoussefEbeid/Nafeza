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

        // Add this inside AuthController class

        [HttpPost("register")]
        public async Task<ActionResult<int>> Register([FromBody] RegisterCommand command)
        {
            // 1. Send data to the handler we just wrote
            var userId = await Mediator.Send(command);

            // 2. Return success
            return Ok(new { UserId = userId, Message = "Registration Successful" });
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