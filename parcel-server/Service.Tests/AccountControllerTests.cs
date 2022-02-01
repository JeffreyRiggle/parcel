using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using System;
using Xunit;
using Moq;
using ParcelServer;
using ParcelServer.Controllers;

namespace Service.Tests
{
    public class AccountController_CreateUser
    {
        [Fact]
        public void CreateUser_Should_ReturnUser()
        {
            var mockLogger = new Mock<ILogger<AccountController>>();
            var mockDao = new Mock<IUserAccountDAO>();
            mockDao.Setup(s => s.addAccount(It.IsAny<UserAccountRequest>())).Returns(new UserAccount {
                UserName = "FooUser",
                FirstName = "Foo",
                LastName = "User",
                Email = "foo@bar.com",
                Gender = "o",
                Created = DateTime.Now,
                Modified = DateTime.Now,
            });

            var controller = new AccountController(mockLogger.Object, mockDao.Object);
            var result = controller.CreateAccount(
                new UserAccountRequest {
                    UserName = "FooUser",
                    FirstName = "Foo",
                    LastName = "User",
                    Email = "foo@bar.com",
                    Gender = "o",
                }
            );

            Assert.True(result.Value?.UserName == "FooUser", "It should have the correct user name");
        }

        [Fact]
        public void CreateUser_Should_ReturnFailure_When_UserExists()
        {
            var mockLogger = new Mock<ILogger<AccountController>>();
            var mockDao = new Mock<IUserAccountDAO>();
            mockDao.Setup(s => s.addAccount(It.IsAny<UserAccountRequest>())).Throws(new ObjectAlreadyExistsException("FooUser"));

            var controller = new AccountController(mockLogger.Object, mockDao.Object);
            var result = controller.CreateAccount(
                new UserAccountRequest {
                    UserName = "FooUser",
                    FirstName = "Foo",
                    LastName = "User",
                    Email = "foo@bar.com",
                    Gender = "o",
                }
            );

            Assert.True((result.Result as ObjectResult)?.StatusCode == 400, "It should return a bad request error");
        }
    }
}