namespace Fanex.Athena.Extension
{
    using System;
    using System.Web;

    public static class HttpContextExtension
    {
        private const string IgnoreShardingHeader = "X-IgnoreSharding";

        public static void AddIgnoreSharding(this HttpContext context)
            => context.Request.Headers.Add(IgnoreShardingHeader, bool.TrueString);

        public static bool IsIgnoreSharding(this HttpContext context)
            => string.Equals(context.GetIgnoreSharding(), bool.TrueString, StringComparison.OrdinalIgnoreCase);

        public static string GetIgnoreSharding(this HttpContext context)
            => context.Request.Headers[IgnoreShardingHeader] ?? string.Empty;
    }
}