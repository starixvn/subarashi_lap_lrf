namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.MetaModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using NUnit.Framework;

    public class PlayerBetLimitUpdateMetaModelTest
    {
        [Test]
        public void IsValid_DefaultSetting_ReturnsFalse()
        {
            // Action
            var expectedObject = new PlayerBetLimitUpdateMetaModel<string>();

            // Assert
            Assert.False(expectedObject.IsValid);
        }

        [Test]
        public void IsValid_SettingNotDefaultAndNotEnum_ReturnsTrue()
        {
            // Action
            var expectedObject = new PlayerBetLimitUpdateMetaModel<string>
            {
                Setting = "test"
            };

            // Assert
            Assert.True(expectedObject.IsValid);
        }

        [Test]
        public void IsValid_SettingNotDefaultAndEmptyEnum_ReturnsFalse()
        {
            // Action
            var expectedObject = new PlayerBetLimitUpdateMetaModel<IEnumerable<string>>
            {
                Setting = new List<string>()
            };

            // Assert
            Assert.False(expectedObject.IsValid);
        }

        [Test]
        public void IsValid_SettingNotDefaultAndNotEmptyEnum_ReturnsTrue()
        {
            // Action
            var expectedObject = new PlayerBetLimitUpdateMetaModel<IEnumerable<string>>
            {
                Setting = new List<string> { "test" }
            };

            // Assert
            Assert.True(expectedObject.IsValid);
        }
    }
}