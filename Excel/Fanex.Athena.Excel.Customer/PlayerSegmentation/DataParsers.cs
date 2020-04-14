using Fanex.Athena.Resources;
using System;
using System.Collections.Generic;

namespace Fanex.Athena.Excel.Customer
{
    public static class DataParsers
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Bug", "S2583:Conditionally executed code should be reachable", Justification = "<Pending>")]
        public static readonly Func<object, object> ParseToYesNo = value =>
        {
            if (value is bool _value)
            {
                return _value ? ViewResources.Yes : ViewResources.No;
            }
            return value;
        };

        public static readonly Func<object, object> ParseToBreaklineText = value => value != null ? string.Join(Environment.NewLine, value as IEnumerable<string>) : value;
    }
}