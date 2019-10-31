using System;

namespace Fanex.Athena.Extension.Utility
{
    public static class DateTimeConverter
    {
        public static DateTime ToGMT(DateTime dateTimeValue, string timeZoneId)
        {
            var utcDate = dateTimeValue;
            if (dateTimeValue.Kind == DateTimeKind.Local)
            {
                utcDate = dateTimeValue.ToUniversalTime();
            }

            utcDate = DateTime.SpecifyKind(utcDate, DateTimeKind.Utc);
            var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);

            return TimeZoneInfo.ConvertTimeFromUtc(utcDate, timeZoneInfo);
        }
    }
}