namespace Fanex.Athena.Extension.UnitTests.Helper
{
    using System;

    using Extension.Helper;

    using NUnit.Framework;

    [TestFixture]
    public class DateTimeHelperTest
    {
        [TestCase("1/1/2016", "12/28/2015")]
        [TestCase("7/25/2016", "7/25/2016")]
        [TestCase("7/28/2016", "7/25/2016")]
        [TestCase("7/31/2016", "7/25/2016")]
        public void GetFirstDateOfWeek_WhenCall_ReturnCorrectDate(DateTime input, DateTime output)
        {
            // Action
            var result = DateTimeHelper.GetFirstDateOfWeek(input);

            // Assert
            Assert.That(result, Is.EqualTo(output));
        }

        [TestCase("7/25/2016", "7/24/2016")]
        [TestCase("7/28/2016", "7/24/2016")]
        [TestCase("7/31/2016", "7/31/2016")]
        public void GetFirstDateOfWeek_StartOfWeekIsSunday_ReturnCorrectDate(DateTime input, DateTime output)
        {
            // Action
            var result = DateTimeHelper.GetFirstDateOfWeek(input, DayOfWeek.Sunday);

            // Assert
            Assert.That(result, Is.EqualTo(output));
        }

        [TestCase(2018, 1, 2, 2018, 1, 1)]
        [TestCase(2018, 1, 31, 2018, 7, 1)]
        [TestCase(2018, 2, 15, 2018, 8, 1)]
        [TestCase(2017, 1, 1, 2018, 1, 1)]
        public void IsValidMonthRange_MaximumRangeIsSix_InvalidToDate_ReturnFalse(int fromYear, int fromMonth, int fromDay, int toYear, int toMonth, int toDay)
        {
            // Arrange
            const int MaximumMonthRange = 6;

            // Action & Assert
            TestIsValidMonthRange(DateTimeHelper.CreateDateTime(fromYear, fromMonth, fromDay), DateTimeHelper.CreateDateTime(toYear, toMonth, toDay), MaximumMonthRange, false);
        }

        [TestCase(2018, 2, 15, 2018, 7, 31)]
        [TestCase(2017, 10, 1, 2018, 1, 1)]
        public void IsValidMonthRange_ValidToDate_ReturnTrue(int fromYear, int fromMonth, int fromDay, int toYear, int toMonth, int toDay)
        {
            // Arrange
            const int MaximumMonthRange = 6;

            // Action & Assert
            TestIsValidMonthRange(DateTimeHelper.CreateDateTime(fromYear, fromMonth, fromDay), DateTimeHelper.CreateDateTime(toYear, toMonth, toDay), MaximumMonthRange, true);
        }

        [TestCase("4/1/2023", DayOfWeek.Monday, "3/27/2023")]
        [TestCase("4/7/2023", DayOfWeek.Tuesday, "4/4/2023")]
        [TestCase("4/7/2023", DayOfWeek.Saturday, "4/1/2023")]
        [TestCase("4/7/2023", DayOfWeek.Sunday, "4/2/2023")]
        [TestCase("4/1/2023", DayOfWeek.Wednesday, "3/29/2023")]
        [TestCase("4/1/2023", DayOfWeek.Sunday, "3/26/2023")]
        [TestCase("4/30/2023", DayOfWeek.Sunday, "4/30/2023")]
        public void DayOfPreviousWeek_WhenCall_ReturnCorrectDate(DateTime input, DayOfWeek dayOfWeek, DateTime output)
        {
            // Action
            var result = DateTimeHelper.DayOfPreviousWeek(input, dayOfWeek);

            // Assert
            Assert.That(result, Is.EqualTo(output));
        }

        [TestCase("4/1/2023", DayOfWeek.Monday, "4/3/2023")]
        [TestCase("4/7/2023", DayOfWeek.Tuesday, "4/11/2023")]
        [TestCase("4/7/2023", DayOfWeek.Saturday, "4/8/2023")]
        [TestCase("4/7/2023", DayOfWeek.Sunday, "4/9/2023")]
        [TestCase("4/30/2023", DayOfWeek.Saturday, "5/6/2023")]
        [TestCase("4/30/2023", DayOfWeek.Sunday, "4/30/2023")]
        public void DayOfNextWeek_WhenCall_ReturnCorrectDate(DateTime input, DayOfWeek dayOfWeek, DateTime output)
        {
            // Action
            var result = DateTimeHelper.DayOfNextWeek(input, dayOfWeek);

            // Assert
            Assert.That(result, Is.EqualTo(output));
        }

        private static void TestIsValidMonthRange(DateTime fromDate, DateTime toDate, int monthRange, bool expected)
        {
            // Action
            var result = DateTimeHelper.IsValidMonthRange(fromDate, toDate, monthRange);

            // Assert
            Assert.That(result, Is.EqualTo(expected), $"{fromDate.ToShortDateString()} - {toDate.ToShortDateString()}: {expected}");
        }
    }
}