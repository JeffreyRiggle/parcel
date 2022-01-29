namespace parcel_server;

public interface IUserAccountDAO
{
    UserAccount addAccount(UserAccountRequest account);
}