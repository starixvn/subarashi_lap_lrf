namespace Fanex.Athena.Controllers.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Autofac.Integration.Mvc;

    using Extension.Utility;
    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using ONEbook.UM.Filters;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class ReportBaseController : ContentBaseController
    {
        public const int PageSizeExcel = int.MaxValue - 1000;

        private IProductService _productService;

        public ReportBaseController(
          ILanguageService languageService,
          ISessionService sessionService
          )
      : this(languageService, sessionService, null)
        {
        }

        public ReportBaseController(
           ILanguageService languageService,
           ISessionService sessionService,
           IProductService productService
           ) : this(languageService, sessionService, null, productService, null)
        {
        }

        public ReportBaseController(
           ILanguageService languageService,
           ISessionService sessionService,
           IProductService productService,
           ILicenseeSettingService licenseeSettingService
           )
       : this(languageService, sessionService, null, productService, licenseeSettingService)
        {
        }

        public ReportBaseController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSetting,
            IProductService productService,
            ILicenseeSettingService licenseeSettingService
            )
        : base(languageService, sessionService, appSetting, licenseeSettingService)
        {
            _productService = productService;
        }

        protected IProductService ProductService
        {
            get
            {
                if (_productService == null)
                {
                    _productService = AutofacDependencyResolver.Current.GetService<IProductService>();
                }

                return _productService;
            }
        }

        protected static IList<ProductOption> ToProductOptions(IEnumerable<Product> productList)
        {
            return productList.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductName,
                Status = true
            }).ToList();
        }
    }
}