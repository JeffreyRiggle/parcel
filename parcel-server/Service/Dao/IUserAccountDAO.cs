namespace ParcelServer;

public interface IUserAccountDAO
{
    UserAccount addAccount(UserAccountRequest account);
}