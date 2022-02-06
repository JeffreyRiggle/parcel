namespace ParcelServer;

public class UserAccountDAO : IUserAccountDAO
{
    private static Object _lockObj = new object();
    private static IUserAccountDAO? _instance;
    private IList<UserAccount> _accounts;

    public UserAccountDAO(IList<UserAccount> accounts)
    {
        _accounts = accounts;
    }

    public static IUserAccountDAO getInstance()
    {
        if (_instance != null)
        {
            return _instance;
        }

        lock (_lockObj)
        {
            if (_instance == null) {
                _instance = new UserAccountDAO(new List<UserAccount>());
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
            throw new ObjectAlreadyExistsException(account?.UserName ?? "unknown");
        }

        var creationTime = DateTime.Now;
        var retVal = new UserAccount {
            UserName = account.UserName,
            FirstName = account.FirstName,
            LastName = account.LastName,
            Password = account.Password,
            Email = account.Email,
            Gender = account.Gender,
            Created = creationTime,
            Modified = creationTime,
        };

        _accounts.Add(retVal);
        return retVal;
    }

    public string login(LoginRequest request)
    {
        var account = _accounts.Where(a => a.UserName == request.UserName).FirstOrDefault();
        if (account == null || account.Password != request.Password)
        {
            throw new Exception("Username does not exist or password is incorrect");
        }
        // TODO implement JWT tokens
        return "faketoken";
    }
}