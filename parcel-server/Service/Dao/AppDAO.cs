namespace ParcelServer;

public class AppDAO : IAppDAO
{
    private IList<AppMetadata> _apps;

    public AppDAO(IList<AppMetadata> apps)
    {
        _apps = apps;
    }

    public IList<AppMetadata> getPopularApps()
    {
        return _apps;
    }

    public IList<AppMetadata> searchApps()
    {
        return _apps;
    }

    public IList<string> getCategories()
    {
        return _apps.Select(a => a.Category).Where(a => a != null).ToList();
    }

    public IList<AppMetadata> getByCategory(string category)
    {
        return _apps.Where(a => category.Equals(a.Category, StringComparison.OrdinalIgnoreCase)).ToList();
    }
}