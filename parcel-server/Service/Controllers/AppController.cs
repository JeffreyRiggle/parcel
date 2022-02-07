using Microsoft.AspNetCore.Mvc;

namespace ParcelServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppController : ControllerBase
{
    private readonly ILogger<AppController> _logger;
    private readonly IAppDAO _dao;


    public AppController(ILogger<AppController> logger, IAppDAO dao)
    {
        _logger = logger;
        _dao = dao;
    }

    [HttpGet("categories")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<CategoriesResult> getCategories()
    {
        try
        {
            return new CategoriesResult {
                Results = _dao.getCategories()
            };
        }
        catch (ObjectAlreadyExistsException e)
        {
            return BadRequest(new { error = e.Message, errorCode = 1 });
        }
    }
}
