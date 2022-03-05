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
        return new CategoriesResult {
            Results = _dao.getCategories()
        };
    }

    [HttpGet("categories/{categoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<AppsResult> getAppsByCategory(string categoryId)
    {
        return new AppsResult {
            Results = _dao.getByCategory(categoryId)
        };
    }
}
