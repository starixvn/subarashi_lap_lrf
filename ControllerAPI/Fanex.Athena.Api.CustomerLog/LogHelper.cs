using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Customer.ViewModel.CustomerLog;
using Fanex.Athena.Resources;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;

namespace Fanex.Athena.Api.CustomerLog
{
    public static class LogHelper
    {
        public const string CommFormat = "0.####";
        public const int MaxCommissionGroupNameShownLength = 25;
        public const int ProductInFirstRow = 3;

        public static void SetTemplateServiceConfiguration()
        {
            var config = new TemplateServiceConfiguration();
            config.Debug = true;
            config.TemplateManager = new MyTemplateManager();
            Engine.Razor = RazorEngineService.Create(config);
        }

        public static string[] GroupLogAttributes()
        {
            var result = new List<string>
            {
                "GroupCommID",
                "GroupName",
                "GroupColor",
                "IsDefault",
                "Closed",
                "Suspended",
                "SpecialLevel"
            };

            var productPermissions = ActionViewModel.ProductPermissions;
            var columnNames = CommissionGroupHelper.MapHardcodedNameFromDB(productPermissions, false);
            foreach (var p in productPermissions)
            {
                result.Add(columnNames[p.Key] + "Comm");
            }

            return result.ToArray();
        }

        public static string[] LicenseeGroupDiscountLogAttributes()
        {
            var result = new List<string>
            {
                "GroupDiscountID",
                "GroupName",
                "GroupColor",
                "IsDefault",
                "Closed",
                "Suspended",
                "SpecialLevel"
            };

            return result.ToArray();
        }

        public static Dictionary<string, string> GetGroupCommissionLogResources(IDictionary<string, bool> productPermissions, ProductAccess productAccess)
        {
            var resource = new Dictionary<string, string>
            {
                ["GroupId"] = ViewResources.GroupId,
                ["GroupName"] = ViewResources.GroupName,
                ["GroupColor"] = ViewResources.GroupColor,
                ["DefaultGroup"] = ViewResources.DefaultGroup,
                ["Yes"] = ViewResources.Yes,
                ["No"] = ViewResources.No,
                ["OldColor"] = ViewResources.OldColor
            };

            foreach (var p in productPermissions)
            {
                resource.Add(p.Key + "Comm", productAccess.GetProductName(p.Key));
            }

            return resource;
        }

        public static Dictionary<string, string> GetGroupCommissionLogResources(IEnumerable<string> productCode, ProductAccess productAccess)
        {
            var resource = new Dictionary<string, string>
            {
                ["GroupId"] = ViewResources.GroupId,
                ["GroupName"] = ViewResources.GroupName,
                ["GroupColor"] = ViewResources.GroupColor,
                ["DefaultGroup"] = ViewResources.DefaultGroup,
                ["Yes"] = ViewResources.Yes,
                ["No"] = ViewResources.No,
                ["OldColor"] = ViewResources.OldColor
            };

            foreach (var p in productCode)
            {
                resource.Add(p, productAccess.GetProductName(p));
            }

            return resource;
        }
    }
}