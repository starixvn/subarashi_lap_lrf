namespace Fanex.Athena.Controllers
{
    using DataAccess.Core.Configuration.Interfaces;

    using Extension.Utility.Interfaces;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class UserGuideController : CultureBaseController
    {
        private const string CustomerListResourceName = "CustomerList";

        private static readonly int[] VS2Sports = new[]
        {
            190, 191, 192, 194, 196, 193, 197
        };

        private static readonly IReadOnlyDictionary<string, bool> ListResourceNoBindData = new Dictionary<string, bool>
        {
            { "PlayerSegmentationProblem".ToLowerInvariant(), true },
            { "PlayerSegmentationVIP".ToLowerInvariant(), true },
        };

        private readonly IProductService _productService;

        private readonly IFileSystem _fileSystem;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public UserGuideController(
            IFileSystem fileSystem,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter)
        {
            _productService = productService;
            _fileSystem = fileSystem;
            _balanceUpDataAccess = balanceUpDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        [AjaxRequest]
        public ActionResult Index(string resourceName)
        {
            var content = GetFileContent(resourceName);
            content = content.Replace("{rooturl}", Url.Content("~"));

            if (NeedBindData(resourceName))
            {
                var products = _productService.GetProductList(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);
                content = AddSpecialProducts(content, products);
                content = AddBalanceUpDate(content);
                content = AddVS2Sport(content);
                content = AddOpenBalanceInfo(content);
            }

            return View("~/Views/UserGuide/Index.cshtml", null, content);
        }

        [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
        public FilePathResult DownloadCustomerListPdf()
        {
            var language = SessionServiceInstance.UserSession.Language;
            var fileName = SessionServiceInstance.LicenseeSession.IsEnableBA ? "Odds Group Feature_Licensee_BA.pdf" : "Odds Group Feature_Licensee.pdf";
            var filePath = Server.MapPath(string.Format(@"~/App_Data/UserGuide/{0}/pdf/{1}/{2}", CustomerListResourceName, language, fileName));
            filePath = GetDefaultFilePathIfNotExist(language, filePath);
            return File(filePath, System.Net.Mime.MediaTypeNames.Application.Pdf, Path.GetFileName(filePath));
        }

        [FunctionAuthorization(PermissionKeys.ReportCashOutWinLoss)]
        public FilePathResult CashoutReportPdf()
        {
            var chineseCodes = new[] { "zh-CN", "zh-TW", "zh-Hans" };
            var suffix = chineseCodes.Contains(SessionServiceInstance.UserSession.Language) ? "CN" : "EN";
            var fileName = $"Cash Out WL Report guideline_{suffix}.pdf";
            var filePath = Server.MapPath(string.Format(@"~/App_Data/UserGuide/CashOutWL/pdf/{0}", fileName));
            return File(filePath, System.Net.Mime.MediaTypeNames.Application.Pdf, Path.GetFileName(filePath));
        }

        private static bool NeedBindData(string resourceName)
        {
            return !ListResourceNoBindData.ContainsKey(resourceName.ToLowerInvariant());
        }

        private static string AddCasinoProducts(string content, IEnumerable<Product> products)
        {
            var result = content;
            if (content.Contains("{casino-productlist-section}"))
            {
                var offerCasino = products.Any(_ => _.ProductID == ProductTypes.SabaCasino);
                if (offerCasino)
                {
                    result = result.Replace("{casino-productlist-section}", string.Empty);
                    result = result.Replace("{/casino-productlist-section}", string.Empty);
                }
                else
                {
                    result = new Regex(@"\{casino-productlist-section\}[\s\S]*{/casino-productlist-section\}").Replace(result, string.Empty);
                }
            }

            return result;
        }

        private static string AddSpecialProducts(string content, IEnumerable<Product> products)
        {
            var customcontent = AddCasinoProducts(content, products);
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VirtualSports, "VS");
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VirtualSports2, "VS2");
            customcontent = RemoveProductSection(customcontent, products, ProductTypes.VS3, Product.VS3);
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
        {
            const string openingTag = "{open-balance-section}";
            const string closingTag = "{/open-balance-section}";

            var customContent = content;
            if (customContent.Contains(openingTag))
            {
                if (SessionServiceInstance.LicenseeSession.IsEnableSingleWallet)
                {
                    const string pattern = @"\{open-balance-section\}[\s\S]*{/open-balance-section\}";
                    customContent = new Regex(pattern).Replace(customContent, string.Empty);
                }
                else
                {
                    customContent = customContent.Replace(openingTag, string.Empty);
                    customContent = customContent.Replace(closingTag, string.Empty);
                }
            }

            return customContent;
        }

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
                    var pattern = @"\{" + productCode + @"-productlist-section\}[\s\S]*{/" + productCode + @"-productlist-section\}";
                    customContent = new Regex(pattern).Replace(customContent, string.Empty);
                }
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
    }
}