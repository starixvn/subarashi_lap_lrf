namespace Fanex.Athena.Controllers
{
    using DataAccess.Core.Configuration.Interfaces;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class UserGuideController : CultureBaseController
    {
        private const string LICENSEE_SUFFIX_SECTION = "licensee-section";

        private static readonly int[] VS2Sports = new[]
        {
            190, 191, 192, 194, 196, 193, 197
        };

        private static readonly IReadOnlyDictionary<string, bool> ListResourceNoBindData = new Dictionary<string, bool>
        {
            { "PlayerSegmentationProblem".ToLowerInvariant(), true },
            { "PlayerSegmentationVIP".ToLowerInvariant(), true },
            { "PlayerSegmentationMonitored".ToLowerInvariant(), true },
        };

        private readonly IProductService _productService;
        private readonly IFileSystem _fileSystem;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly IAuthorizationService _authrizationService;

        public UserGuideController(
            IFileSystem fileSystem,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService)
        {
            _productService = productService;
            _fileSystem = fileSystem;
            _balanceUpDataAccess = balanceUpDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
            _authrizationService = authorizationService;
        }

        [AjaxRequest]
        public ActionResult Index(string resourceName)
        {
            var content = GetFileContent(resourceName);
            content = content.Replace("{rooturl}", Url.Content("~"));        
            if (NeedBindData(resourceName))
            {
                var products = _productService.GetProductList(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
                content = AddSiteDBReportNote(content);
                content = AddSpecialProducts(content, products);
                content = AddBalanceUpDate(content);
                content = AddMoveBetDateFrom(content);
                content = AddVS2Sport(content);
                content = AddOpenBalanceInfo(content);
                content = RemovePermissionSection(content, PermissionKeys.PlayerVIPManagement);
                content = AddLicenseeSection(content, SessionServiceInstance.LicenseeSession.LicenseeName);
            }

            return View("~/Views/UserGuide/Index.cshtml", null, content);
        }

        private static bool NeedBindData(string resourceName)
            => !ListResourceNoBindData.ContainsKey(resourceName.ToLowerInvariant());

        private static string AddCasinoProducts(string content, IEnumerable<Product> products)
            => Replace(content, "{casino-productlist-section}", "{/casino-productlist-section}", products.Any(_ => _.ProductID == ProductTypes.SabaCasino));

        private string AddSiteDBReportNote(string content)
            => Replace(
                Replace(content, "{sitedb-report-section}", "{/sitedb-report-section}", !string.IsNullOrEmpty(SessionServiceInstance.LicenseeSession.SiteDBServer)),
                    "{centraldb-report-section}", "{/centraldb-report-section}", string.IsNullOrEmpty(SessionServiceInstance.LicenseeSession.SiteDBServer)
                    );

        private static string AddSpecialProducts(string content, IEnumerable<Product> products)
        {
            var customcontent = AddCasinoProducts(content, products);
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VirtualSports, "VS");
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VirtualSports2, "VS2");
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VS3, Product.VS3);
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.BA, Product.BA);
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.CashOut, Product.CO);
            return customcontent;
        }

        private string AddVS2Sport(string content)
        {
            const string VS2SportTag = "{VS2-sportList}";
            var customContent = content;

            if (content.Contains(VS2SportTag))
            {
                var language = SessionServiceInstance.UserSession.Language;
                var VS2SportNames = VS2Sports.Select(_ => _cacheRefAdapter.GetSportName(_, language));

                customContent = customContent.Replace(VS2SportTag, string.Join<string>(", ", VS2SportNames));
                customContent = customContent.Replace(VS2SportTag, string.Empty);
                customContent = customContent.Replace(VS2SportTag, string.Empty);
            }

            return customContent;
        }

        private string AddOpenBalanceInfo(string content)
            => Replace(content, "{open-balance-section}", "{/open-balance-section}", !SessionServiceInstance.LicenseeSession.IsEnableSingleWallet);

        private static string RemoveProductSection(string content, IEnumerable<Product> products, int productId, string productCode)
        {
            var openingTag = "{" + productCode + "-productlist-section}";

            var customContent = content;
            if (customContent.Contains(openingTag))
            {
                if (products.Any(x => x.ProductID == productId))
                {
                    var closingTag = "{/" + productCode + "-productlist-section}";
                    customContent = customContent.Replace(openingTag, string.Empty);
                    customContent = customContent.Replace(closingTag, string.Empty);
                }
                else
                {
                    var pattern = @"\{" + productCode + @"-productlist-section\}([\s\S]*?){/" + productCode + @"-productlist-section\}";
                    customContent = new Regex(pattern).Replace(customContent, string.Empty);
                }
            }

            return customContent;
        }

        private string RemovePermissionSection(string content, string permission)
        {
            var openingTag = $"{{{permission}-permission-section}}";
            var closingTag = $"{{/{permission}-permission-section}}";
            var customContent = content;
            if (_authrizationService.HasPermissions(SessionServiceInstance.UserSession, permission))
            {
                customContent = customContent.Replace(openingTag, string.Empty);
                customContent = customContent.Replace(closingTag, string.Empty);
            }
            else
            {
                var pattern = $"{openingTag}[\\s\\S]*{closingTag}";
                customContent = new Regex(pattern).Replace(customContent, string.Empty);
            }
            return customContent;
        }

        private static string AddLicenseeSection(string content, string licenseeName)
        {
            var openingTag = $"{{{licenseeName}-{LICENSEE_SUFFIX_SECTION}}}";
            var closingTag = $"{{/{licenseeName}-{LICENSEE_SUFFIX_SECTION}}}";
            var customContent = content;
            if (content.Contains(openingTag))
            {
                customContent = Replace(customContent, openingTag, closingTag, true);
            }
            return RemoveUnShowLicenseeSection(customContent);
        }

        private static string RemoveUnShowLicenseeSection(string content)
        {
            var customContent = content;
            var linceseeTagPattern = $"{{[\\w\\d]+-{LICENSEE_SUFFIX_SECTION}}}";
            var matchItems = new Regex(linceseeTagPattern).Matches(customContent)
                .OfType<System.Text.RegularExpressions.Match>()
                .Select(_ => _.Value);
            foreach (var matchItem in matchItems)
            {
                var removeLicenseeNameSection = matchItem.Replace($"-{LICENSEE_SUFFIX_SECTION}}}", string.Empty)
                    .Replace("{", string.Empty);
                var openingTag = $"{{{removeLicenseeNameSection}-{LICENSEE_SUFFIX_SECTION}}}";
                var closingTag = $"{{\\/{removeLicenseeNameSection}-{LICENSEE_SUFFIX_SECTION}}}";
                var removePattern = $"{openingTag}([\\s\\S]*?){closingTag}";
                customContent = new Regex(removePattern).Replace(customContent, string.Empty);
            }
            return customContent;
        }

        private string AddBalanceUpDate(string content)
        {
            const string PlaceHolder = "{balance-up-date}";
            if (content.Contains(PlaceHolder))
            {
                var date = _balanceUpDataAccess.GetBalanceUp().BalanceUpDay;
                return content.Replace(PlaceHolder, date.ToString("MM/dd/yyyy"));
            }

            return content;
        }

        private string AddMoveBetDateFrom(string content)
        {
            const string PlaceHolder = "{move-bet-date-from}";
            if (content.Contains(PlaceHolder))
            {
                var date = _balanceUpDataAccess.GetBalanceUp().MoveBetsDay.AddDays(1);
                return content.Replace(PlaceHolder, date.ToString("MM/dd/yyyy"));
            }

            return content;
        }

        private string GetDefaultFilePathIfNotExist(string language, string filePath)
        {
            if (!language.Equals(DefaultLanguage, System.StringComparison.OrdinalIgnoreCase) && !_fileSystem.Exists(filePath))
            {
                return filePath.Replace(language, DefaultLanguage);
            }

            return filePath;
        }

        private string GetFileContent(string resourceName)
        {
            var language = SessionServiceInstance.UserSession.Language;

            var filePath = Server.MapPath(string.Format(@"~/App_Data/UserGuide/{0}/{1}.htm", resourceName, language));
            filePath = GetDefaultFilePathIfNotExist(language, filePath);

            return _fileSystem.ReadFile(filePath);
        }

        private static string Replace(string content, string openingSectionTag, string closingSectionTag, bool shouldKeepSection)
        {
            var result = content;
            if (content.Contains(openingSectionTag))
            {
                if (shouldKeepSection)
                {
                    result = result.Replace(openingSectionTag, string.Empty);
                    result = result.Replace(closingSectionTag, string.Empty);
                }
                else
                {
                    result = new Regex($@"{openingSectionTag}[\s\S]*{closingSectionTag}").Replace(result, string.Empty);
                }
            }

            return result;
        }
    }
}