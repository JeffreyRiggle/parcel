using Microsoft.AspNetCore.Mvc;

namespace ParcelServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly IUserAccountDAO _dao;


    public AccountController(ILogger<AccountController> logger, IUserAccountDAO dao)
    {
        _logger = logger;
        _dao = dao;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<UserAccount> createAccount(UserAccountRequest request)
    {
        try
        {
            return _dao.addAccount(request);
        }
        catch (ObjectAlreadyExistsException e)
        {
            return BadRequest(new { error = e.Message, errorCode = 1 });
        }
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult<TokenResult> login(LoginRequest request)
    {
        try
        {
            return new TokenResult{ Token = _dao.login(request) };
        } catch (Exception e)
        {
            return Unauthorized(new { error = e.Message, errorCode = 1});
        }
    }
}
