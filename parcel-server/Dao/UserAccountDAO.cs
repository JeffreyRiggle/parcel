namespace parcel_server;

public class UserAccountDAO
{
    private static Object _lockObj = new object();
    private static UserAccountDAO? _instance;
    private IList<UserAccount> _accounts;

    public UserAccountDAO()
    {
        _accounts = new List<UserAccount>();
    }

    public static UserAccountDAO getInstance()
    {
        if (_instance != null)
        {
            return _instance;
        }

        lock (_lockObj)
        {
            if (_instance == null) {
                _instance = new UserAccountDAO();
            }

            return _instance;
        }
    }

    private bool canCreateAccount(UserAccountRequest account)
    {
        var retVal = true;
        foreach (var acc in _accounts)
        {
            if (String.Compare(acc.UserName, account.UserName, StringComparison.OrdinalIgnoreCase) == 0)
            {
                retVal = false;
                break;
            }
        }

        return retVal;
    }

    public UserAccount addAccount(UserAccountRequest account)
    {
        if (!canCreateAccount(account))
        {
            throw new Exception("Invalid Request");
        }

        var creationTime = DateTime.Now;
        var retVal = new UserAccount {
            UserName = account.UserName,
            FirstName = account.FirstName,
            LastName = account.LastName,
            Email = account.Email,
            Gender = account.Gender,
            Created = creationTime,
            Modified = creationTime,
        };

        _accounts.Add(retVal);
        return retVal;
    }
}