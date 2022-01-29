using Xunit;
using parcel_server;

namespace Service.Tests
{
    public class UserAccountDAO_CreateUser
    {
        [Fact]
        public void CreateUser_Should_ReturnUser()
        {
            var result = UserAccountDAO.getInstance().addAccount(
                new UserAccountRequest {
                    UserName = "FooUser",
                    FirstName = "Foo",
                    LastName = "User",
                    Email = "foo@bar.com",
                    Gender = "o",
                }
            );

            Assert.True(result.Created != null, "It should have a created date");
            Assert.True(result.Modified != null, "It should have a modified date");
            Assert.True(result.UserName == "FooUser", "It should have the correct user name");
        }
    }
}