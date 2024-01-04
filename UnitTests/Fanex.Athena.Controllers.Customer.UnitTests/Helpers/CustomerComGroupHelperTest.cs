using Fanex.Athena.Controllers.Customer.Helpers;
using Fanex.Athena.Model.Customer.MetaModel;

using NUnit.Framework;

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
                SBComm = 1
            };

            var editedGroup = new GroupCommMetaModel
            {
                SBComm = 2
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

        private static GroupCommMetaModel CreateSampleGroupComm()
        {
            return new GroupCommMetaModel
            {
                SBComm = 1,
                ParlayComm = 2,
                NGComm = 3,
                CSComm = 4,
                GroupColor = "sdf",
                GroupCommId = 99,
                GroupName = "sd;ljsdf",
                IsDefaultGroup = true
            };
        }
    }
}