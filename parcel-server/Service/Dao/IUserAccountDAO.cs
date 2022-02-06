namespace ParcelServer;

public interface IUserAccountDAO
{
    UserAccount addAccount(UserAccountRequest account);
    string login(LoginRequest request);
}