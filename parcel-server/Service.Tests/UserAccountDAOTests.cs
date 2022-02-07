using Xunit;
using System.Collections.Generic;
using System;
using ParcelServer;

namespace Service.Tests
{
    public class UserAccountDAOAddAccount
    {
        [Fact]
        public void addAccountShouldReturnUser()
        {
            var result = new UserAccountDAO(new List<UserAccount>()).addAccount(
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

        [Fact]
        public void addAccountShouldThrowWhenUserExists()
        {
            Assert.Throws<ObjectAlreadyExistsException>(() => new UserAccountDAO(new List<UserAccount>() {
                new UserAccount {
                    UserName = "FooUser",
                }
            }).addAccount(
                new UserAccountRequest {
                    UserName = "FooUser",
                    FirstName = "Foo",
                    LastName = "User",
                    Email = "foo@bar.com",
                    Gender = "o",
                }
            ));
        }
    }

    public class UserAccountDAOLogin
    {
        [Fact]
        public void loginShouldPassWhenUserAndPasswordMatch()
        {
            var result = new UserAccountDAO(new List<UserAccount>() {
                new UserAccount {
                    UserName = "FooUser",
                    Password = "Secure",
                }
            }).login(new LoginRequest {
                UserName = "FooUser",
                Password = "Secure",
            });

            Assert.Equal(result, "faketoken");
        }

        [Fact]
        public void nonExistantUserShouldFailLogin()
        {
            Assert.Throws<Exception>(() => new UserAccountDAO(new List<UserAccount>()).login(new LoginRequest{
                UserName = "FooUser",
                Password = "Secure",
            }));
        }

        [Fact]
        public void invalidPasswordShouldFailLogin()
        {
            Assert.Throws<Exception>(() => new UserAccountDAO(new List<UserAccount>() {
                new UserAccount {
                    UserName = "FooUser",
                    Password = "Secure",
                }
            }).login(new LoginRequest {
                UserName = "FooUser",
                Password = "rainbowTable",
            }));
        }
    }
}