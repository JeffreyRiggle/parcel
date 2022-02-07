using Xunit;
using System.Collections.Generic;
using System;
using ParcelServer;

namespace Service.Tests
{
    public class AppDAOGetCategories
    {
        [Fact]
        public void getCategoriesShouldReturnKnownCategories()
        {
            var result = new AppDAO(new List<AppMetadata>(){
                new AppMetadata {
                    Name = "Foo",
                    Category = "Development"
                },
                new AppMetadata {
                    Name = "Bar",
                    Category = "Music"
                }
            }).getCategories();

            Assert.True(result.Count == 2, "It should have the correct number of results");
        }
    }
}