namespace ParcelServer;

public class ServiceRegistration
{
    public void registerServices(IServiceCollection services)
    {
        services.AddSingleton<IUserAccountDAO, UserAccountDAO>(s => new UserAccountDAO(new List<UserAccount>()));
        services.AddSingleton<IAppDAO, AppDAO>(s => new AppDAO(new List<AppMetadata>(){
            new AppMetadata {
                Name = "Test App",
                Category = "Development"
            },
            new AppMetadata {
                Name = "My Game",
                Category = "Gaming"
            },
            new AppMetadata {
                Name = "Cool Calculator",
                Category = "Productivity"
            },
            new AppMetadata {
                Name = "Bar Foo",
                Category = "Music"
            }
        }));
    }
}