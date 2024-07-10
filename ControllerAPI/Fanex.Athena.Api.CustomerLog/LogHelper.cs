using System.Collections.Generic;
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
            var config = new TemplateServiceConfiguration
            {
                Debug = true,
                TemplateManager = new MyTemplateManager()
            };
            Engine.Razor = RazorEngineService.Create(config);
        }

        public static string[] GroupLogAttributes()
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

        public static Dictionary<string, string> GetGroupCommissionLogResources(IEnumerable<string> productCode)
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
                resource.Add(p, ViewResources.ResourceManager.GetString("Product" + p));
            }

            return resource;
        }
    }
}