namespace Fanex.Athena.Extension.Helper
{
    using System;

    public static class ConvertHelper
    {
        public static DateTime ToDateTime(string date, bool isMonthly)
        {
            var year = Convert.ToInt32(date.Substring(0, 4));
            var month = Convert.ToInt32(date.Substring(4, 2));
            var day = isMonthly ? 1 : Convert.ToInt32(date.Substring(6, 2));

            return DateTimeHelper.CreateDateTime(year, month, day);
        }

        public static string GetDateString(string date, string format, string defaultValue)
        {
            DateTime.TryParse(date, out DateTime tmpDate);
            if (tmpDate != DateTime.MinValue)
            {
                return tmpDate.ToString(format);
            }

            return defaultValue;
        }
    }
}