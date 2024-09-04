namespace Fanex.Athena.Api.CustomerLog
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web.Hosting;
    using System.Xml;

    using Base;
    using Base.Attributes;

    using DataAccess.Customer.Interfaces;

    using Extension.Utility;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.DTO.CustomerLog;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.ViewModel.CustomerLog;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using RazorEngine;
    using RazorEngine.Templating;

    using Resources;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class LogController : BaseApiController
    {
        private static readonly int[] ActionIdListForBA = new[] { 2401, 2403, 2801 };
        private static readonly int[] LicenseeGroupDiscountActionIds = new[] { 2615, 2616, 2617 };

        private static readonly Dictionary<int[], string> ActionIdMapper = new Dictionary<int[], string>
        {
            { LicenseeGroupDiscountActionIds, "LicenseeGroupComm" }
        };

        private readonly ICustomerLogDataAccess _customerLogDataAccess;

        private readonly ILogInLogDataAccess _logInLogDataAccess;

        private readonly IFileSystem _fileSystem;
        private readonly IProductService _productService;
        private readonly IGroupComService _groupComService;
        private readonly ICustomMemoryCacheService _cacheService;

        public LogController(
            ILanguageService languageService,
            ICustomerLogDataAccess customerLogDataAccess,
            ILogInLogDataAccess logInLogDataAccess,
            IFileSystem fileSystem,
            IProductService productService,
            IGroupComService groupComService,
            ICustomMemoryCacheService cacheService)
            : base(languageService)
        {
            _customerLogDataAccess = customerLogDataAccess;
            _logInLogDataAccess = logInLogDataAccess;
            _fileSystem = fileSystem;
            _productService = productService;
            _groupComService = groupComService;
            _cacheService = cacheService;
        }

        #region Remove HTML tag

        private static string RemoveHtmlTags(string source)
        {
            var regex = new Regex("[/<>]");
            return regex.Replace(source, string.Empty);
        }

        private static IList<CustomerLog> RemoveHtmlTag(IList<CustomerLog> datalist)
        {
            foreach (var item in datalist.Where(_ => !LicenseeGroupDiscountActionIds.Contains(_.ActionId)))
            {
                var trackingCharCount = item.TrackingValue.Length;
                var trackingOldCharCount = item.TrackingValueOld.Length;

                // Remove HTML tag inside tracking value
                if (trackingCharCount > 0 && trackingOldCharCount > 0)
                {
                    var trackingValue = item.TrackingValue.Substring(1, trackingCharCount - 3);
                    var trackingValueOld = item.TrackingValueOld.Substring(1, trackingOldCharCount - 3);

                    // Add </> tag after remove all html tag
                    item.TrackingValue = "<" + RemoveHtmlTags(trackingValue) + "/>";
                    item.TrackingValueOld = "<" + RemoveHtmlTags(trackingValueOld) + "/>";
                }
            }

            return datalist;
        }

        #endregion Remove HTML tag

        #region Get XML attribute

        private static IDictionary<string, string> GetXmlAttr(string trackingValue, string trackingValueOld, string[] actionTypes, IEnumerable<GroupCommSettingMetaModel> commSettings = null)
        {
            var dictonary = new Dictionary<string, string>();

            var doc = new XmlDocument();
            var docOld = new XmlDocument();
            if (!string.IsNullOrEmpty(trackingValue))
            {
                doc.LoadXml(trackingValue);
            }

            if (!string.IsNullOrEmpty(trackingValueOld))
            {
                docOld.LoadXml(trackingValueOld);
            }

            var root = doc.DocumentElement;
            var rootOld = docOld.DocumentElement;

            foreach (var attr in actionTypes)
            {
                dictonary.Add(attr, GetAttributeValue(root, attr));
                dictonary.Add(attr + "Old", GetAttributeValue(rootOld, attr));
            }

            if (commSettings != null && commSettings.Any())
            {
                ReadCommValuesElement(root, rootOld, dictonary, commSettings);
            }

            return dictonary;
        }

        private static void ReadCommValuesElement(XmlElement root, XmlElement rootOld, Dictionary<string, string> dictionary, IEnumerable<GroupCommSettingMetaModel> commSettings)
        {
            var rootCommElements = root.GetElementsByTagName("r");
            var rootOldCommNElements = rootOld.GetElementsByTagName("r");

            GetCommValuesXmlAttr(dictionary, rootCommElements, commSettings);
            GetCommValuesXmlAttr(dictionary, rootOldCommNElements, commSettings, "Old");
        }

        private static void GetCommValuesXmlAttr(Dictionary<string, string> dictionary, XmlNodeList elements, IEnumerable<GroupCommSettingMetaModel> commSettings, string suffix = "")
        {
            foreach (XmlNode element in elements)
            {
                var sportType = Convert.ToInt32(element.Attributes["SportType"]?.Value);
                var betType = Convert.ToInt32(element.Attributes["BetType"]?.Value);
                var discount = element.Attributes["Discount"]?.Value;
                var key = commSettings.FirstOrDefault(_ => _.Sporttype == sportType && _.Bettype == betType)?.ProductCode + suffix;

                if (!string.IsNullOrEmpty(key) && !dictionary.ContainsKey(key))
                {
                    dictionary.Add(key, discount);
                }
            }
        }

        private static string GetAttributeValue(XmlElement root, string attribute)
        {
            return root != null && root.HasAttribute(attribute) ?
                root.GetAttribute(attribute) :
                string.Empty;
        }

        #endregion Get XML attribute

        private string GenerateDetailedValue(int actionId, ActionViewModel viewModel)
        {
            var viewPath = $"~/Views/Desktop/Customer/CustomerLog/Action/{GetActionIdMappedValue(actionId)}.cshtml";

            var templatePath = HostingEnvironment.MapPath(viewPath);
            var template = _fileSystem.ReadFile(templatePath);
            return Engine.Razor.RunCompile(template, viewPath, model: viewModel);
        }

        public static string GetActionIdMappedValue(int actionId)
        {
            foreach (var key in ActionIdMapper.Keys)
            {
                if (key.Contains(actionId))
                {
                    return ActionIdMapper[key];
                }
            }
            return actionId.ToString();
        }

        #region Get detail data

        private IList<CustomerLog> GetDetails(IList<CustomerLog> dataList, IEnumerable<GroupCommSettingMetaModel> commSettings = null)
        {
            var resourcesMap = new Dictionary<string, string>
            {
                { "Closed", ViewResources.Closed },
                { "Suspended", ViewResources.Suspended },
                { "SpecialLevel", ViewResources.SpecialLevel },
                { "GroupId", ViewResources.GroupId },
                { "GroupName", ViewResources.GroupName },
                { "GroupColor", ViewResources.GroupColor },
                { "SBComm", ViewResources.SBComm },
                { "NGComm", ViewResources.NGComm },
                { "CSComm", ViewResources.CSComm },
                { "Yes", ViewResources.Yes },
                { "No", ViewResources.No },
                { "OldColor", ViewResources.OldColor },
                { "Comm", ViewResources.Comm }
            };

            foreach (var item in dataList)
            {
                // No need to read xml data for BA
                if (ActionIdListForBA.Contains(item.ActionId))
                {
                    item.Details = string.Empty;
                }
                else if (LicenseeGroupDiscountActionIds.Contains(item.ActionId))
                {
                    var dictionary = GetXmlAttr(item.TrackingValue, item.TrackingValueOld, LogHelper.LicenseeGroupDiscountLogAttributes(), commSettings);
                    var action = new ActionViewModel
                    {
                        Data = dictionary,
                        Resource = resourcesMap,
                        ProductList = GetProductCodeList(commSettings)
                    };

                    item.Details = GenerateDetailedValue(item.ActionId, action);
                }
                else
                {
                    var dictionary = GetXmlAttr(item.TrackingValue, item.TrackingValueOld, LogHelper.GroupLogAttributes());
                    var action = new ActionViewModel
                    {
                        Data = dictionary,
                        Resource = resourcesMap
                    };

                    item.Details = GenerateDetailedValue(item.ActionId, action);
                }
            }

            return dataList;
        }

        private static IEnumerable<string> GetProductCodeList(IEnumerable<GroupCommSettingMetaModel> commSettings)
        {
            if (commSettings != null && commSettings.Any())
            {
                return commSettings.Select(_ => _.ProductCode).Distinct().OrderBy(_ => CommissionGroupHelper.ProductListComparer(_)).ThenBy(_ => _);
            }

            return new List<string>();
        }

        #endregion Get detail data
    }
}