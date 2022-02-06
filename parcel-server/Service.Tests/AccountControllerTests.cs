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
        public void createUser_Should_ReturnUser()
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
            var result = controller.createAccount(
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
        public void createUser_Should_ReturnFailure_When_UserExists()
        {
            var mockLogger = new Mock<ILogger<AccountController>>();
            var mockDao = new Mock<IUserAccountDAO>();
            mockDao.Setup(s => s.addAccount(It.IsAny<UserAccountRequest>())).Throws(new ObjectAlreadyExistsException("FooUser"));

            var controller = new AccountController(mockLogger.Object, mockDao.Object);
            var result = controller.createAccount(
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

    public class AccountController_Login
    {
        [Fact]
        public void successfull_Login_Should_ReturnToken()
        {
            var mockLogger = new Mock<ILogger<AccountController>>();
            var mockDao = new Mock<IUserAccountDAO>();
            mockDao.Setup(s => s.login(It.IsAny<LoginRequest>())).Returns("mockToken");

            var controller = new AccountController(mockLogger.Object, mockDao.Object);
            var result = controller.login(
                new LoginRequest {
                    UserName = "FooUser",
                    Password = "Secure"
                }
            );

            Assert.True(result.Value.Token == "mockToken", "It should have the correct token");
        }

        [Fact]
        public void failed_Login_Should_ReturnFailure_When_Validation_Fails()
        {
            var mockLogger = new Mock<ILogger<AccountController>>();
            var mockDao = new Mock<IUserAccountDAO>();
            mockDao.Setup(s => s.login(It.IsAny<LoginRequest>())).Throws(new Exception("Username or password do not work"));

            var controller = new AccountController(mockLogger.Object, mockDao.Object);
            var result = controller.login(
                new LoginRequest {
                    UserName = "FooUser",
                    Password = "Secure"
                }
            );

            Assert.True((result.Result as ObjectResult)?.StatusCode == 401, "It should return an unathorized error");
        }
    }
}