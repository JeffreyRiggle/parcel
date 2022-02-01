namespace ParcelServer;

public class ServiceRegistration
{
    public void registerServices(IServiceCollection services)
    {
        services.AddSingleton<IUserAccountDAO, UserAccountDAO>();
    }
}