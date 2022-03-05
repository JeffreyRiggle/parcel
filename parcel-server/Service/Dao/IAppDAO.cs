namespace ParcelServer;

public interface IAppDAO
{
    IList<AppMetadata> getPopularApps();
    IList<AppMetadata> searchApps();
    IList<string> getCategories();   

    IList<AppMetadata> getByCategory(string category); 
}