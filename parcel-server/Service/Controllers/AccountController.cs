using Microsoft.AspNetCore.Mvc;

namespace parcel_server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly UserAccountDAO _dao;


    public AccountController(ILogger<AccountController> logger)
    {
        _logger = logger;
        _dao = UserAccountDAO.getInstance();
    }

    [HttpPost]
    public UserAccount CreateAccount(UserAccountRequest request)
    {
        return _dao.addAccount(request);
    }
}
