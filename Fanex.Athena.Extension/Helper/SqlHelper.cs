namespace Fanex.Athena.Extension.Helper
{
    public static class SqlHelper
    {
        public static string ToSqlTextSearch(string text)
            => string.IsNullOrEmpty(text) ? text : text.Trim().Replace("_", "[_]");
    }
}