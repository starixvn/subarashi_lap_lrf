namespace Fanex.Athena.Model.Customer.ViewModel.CustomerLog
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Resources;

    public class ActionViewModel
    {
        public static IDictionary<string, bool> ProductPermissions { get; set; }

        public IDictionary<string, string> Data { get; set; }

        public IDictionary<string, string> Resource { get; set; }

        public IEnumerable<string> ProductList { get; set; }

        public static ProductAccess ProductAccess { get; set; }

        public string GetClassName(string fieldName)
        {
            return IsChanged(fieldName) ? "old-value red-text" : "hide";
        }

        public bool IsChanged(string fieldName)
        {
            var oldField = fieldName + "Old";

            return Data.ContainsKey(fieldName)
                && Data.ContainsKey(oldField)
                && Data[fieldName] != Data[oldField];
        }

        public string Display(string fieldName, int maxLength = -1)
        {
            var value = Data[fieldName];

            return maxLength != -1 && value.Length > maxLength
                ? value.Substring(0, maxLength)
                : value;
        }

        public string TitleOfChange(string fieldName, string format)
        {
            var oldField = fieldName + "Old";

            return Data.ContainsKey(fieldName) && Data.ContainsKey(oldField)
                ? string.Format(Data[oldField], format) + "-->" + string.Format(Data[fieldName], format)
                : string.Empty;
        }

        public string DisplayYesNo(string fieldName)
        {
            var value = Data[fieldName];

            return value == "1" ? ViewResources.Yes : ViewResources.No;
        }

        public static void SetProductPermissions(IDictionary<string, bool> productPermissions)
        {
            var result = new Dictionary<string, bool>();
            foreach (var p in productPermissions)
            {
                if (!p.Value)
                {
                    continue;
                }

                result[p.Key] = p.Value;
            }

            ProductPermissions = result;
        }
    }
}