using Fanex.Athena.Controllers.Customer.Helpers;
using Fanex.Athena.Model.Customer.MetaModel;

using NUnit.Framework;
using System.Collections.Generic;

namespace Fanex.Athena.Controllers.Customer.UnitTests.Helpers
{
    [TestFixture]
    public class CustomerComGroupHelperTest
    {
        [TestCase(100, "Commission cannot be greater than 15%")]
        [TestCase(101, "This Group does not exist!")]
        [TestCase(9999, "")]
        public void GetUpdateGroupErrorMessage_WhenCall_ReturnCorrectData(int errorCode, string expectedMessage)
        {
            // Action
            var message = CustomerComGroupHelper.GetUpdateGroupErrorMessage(errorCode);

            // Assert
            Assert.That(message, Is.EqualTo(expectedMessage));
        }

        [TestCase(100, "Commission cannot be greater than 15%")]
        [TestCase(101, "Group creation failed")]
        [TestCase(9999, "")]
        public void GetCreateGroupErrorMessage_WhenCall_ReturnCorrectData(int errorCode, string expectedMessage)
        {
            // Action
            var message = CustomerComGroupHelper.GetCreateGroupErrorMessage(errorCode);

            // Assert
            Assert.That(message, Is.EqualTo(expectedMessage));
        }

        [Test]
        public void IsSameGroup_NotSameComm_ReturnFalse()
        {
            // Arrange
            var currentGroup = new GroupCommMetaModel
            {
                GroupColor = "sdf",
                GroupCommId = 99,
                GroupName = "sd;ljsdf",
                IsDefaultGroup = true,
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel()
                }
            };

            var editedGroup = new GroupCommMetaModel
            {
                GroupColor = "sdf",
                GroupCommId = 100,
                GroupName = "sd;ljsdf2",
                IsDefaultGroup = true,
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel()
                }
            };

            // Action
            var result = CustomerComGroupHelper.IsSameGroup(currentGroup, editedGroup);

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsSameGroup_GroupsHaveSameData_ReturnTrue()
        {
            var currentGroup = CreateSampleGroupComm();

            var editedGroup = CreateSampleGroupComm();

            // Action
            var result = CustomerComGroupHelper.IsSameGroup(currentGroup, editedGroup);

            // Assert
            Assert.That(result, Is.True);
        }

        [TestCase(-1)]
        [TestCase(0.16)]
        public void IsValidCommissions_InvalidCommValue_ReturnFalse(decimal discount)
        {
            var editGroup = new GroupCommMetaModel
            {
                GroupName = "Test",
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel
                    {
                        Discount = discount,
                        Sporttype = 1,
                        ProductCode = "SB"
                    }
                }
            };

            // Action
            var result = CustomerComGroupHelper.IsValidCommissions(editGroup);

            // Assert
            Assert.That(result, Is.False);
        }

        [TestCase(0)]
        [TestCase(0.15)]
        public void IsValidCommissions_ValidCommValue_ReturnTrue(decimal discount)
        {
            var editGroup = new GroupCommMetaModel
            {
                GroupName = "Test",
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel
                    {
                        Discount = discount,
                        Sporttype = 1,
                        ProductCode = "SB"
                    }
                }
            };

            // Action
            var result = CustomerComGroupHelper.IsValidCommissions(editGroup);

            // Assert
            Assert.That(result, Is.True);
        }

        private static GroupCommMetaModel CreateSampleGroupComm()
        {
            return new GroupCommMetaModel
            {
                GroupColor = "sdf",
                GroupCommId = 99,
                GroupName = "sd;ljsdf",
                IsDefaultGroup = true,
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel()
                }
            };
        }
    }
}