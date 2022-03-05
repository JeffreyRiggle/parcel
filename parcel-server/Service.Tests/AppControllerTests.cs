using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Xunit;
using Moq;
using ParcelServer;
using ParcelServer.Controllers;

namespace Service.Tests
{
    public class AppControllerGetCategories
    {
        [Fact]
        public void getCategoriesShouldReturnCategories()
        {
            var mockLogger = new Mock<ILogger<AppController>>();
            var mockDao = new Mock<IAppDAO>();
            mockDao.Setup(s => s.getCategories()).Returns(new List<string>() {
                "Game",
                "Productivity",
                "Music"
            });

            var controller = new AppController(mockLogger.Object, mockDao.Object);
            var result = controller.getCategories();

            Assert.True(result.Value?.Results?.Count == 3, "It should have the correct number of categories");
        }
    }

    public class AppControllerGetCategory
    {
        [Fact]
        public void getCategoryShouldReturnMatchingApps()
        {
            var mockLogger = new Mock<ILogger<AppController>>();
            var mockDao = new Mock<IAppDAO>();
            mockDao.Setup(s => s.getByCategory(It.IsAny<string>())).Returns(new List<AppMetadata>() {
                new AppMetadata {
                    Category = "Music",
                    Name = "Mugen"
                },
            });

            var controller = new AppController(mockLogger.Object, mockDao.Object);
            var result = controller.getAppsByCategory("Music");

            Assert.True(result.Value?.Results?.Count == 1, "It should have the correct number of apps");
        }
    }
}