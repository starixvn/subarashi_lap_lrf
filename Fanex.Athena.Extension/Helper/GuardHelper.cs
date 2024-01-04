namespace Fanex.Athena.Extension.Helper
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class GuardHelper
    {
        public static bool IsPresent<T>(this IEnumerable<T> source, Func<T, bool> predicate = null)
           => source != null && (predicate == null ? source.Any() : source.Any(predicate));
    }
}