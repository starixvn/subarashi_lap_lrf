namespace Fanex.Athena.Api.Base
{
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using NPOI.SS.UserModel;
    using ONEbook.UM.Filters;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;
    using System.Web.Http.Results;

    [CheckUMFilter]
    [XFrameOptionApi]
    public class BaseApiController : ApiController
    {
        private readonly ILanguageService _langService;

        protected internal BaseApiController(ILanguageService languageService)
        {
            _langService = languageService;
        }

        public IProductService ProductService { get; set; }

        public ISessionService SessionService { get; set; }

        public ISubsidiaryService SubsidiaryService { get; set; }

        protected UserAuthInfo UserSession => SessionService.UserSession;

        protected LicenseeAuthInfo LicenseeSession => SessionService.LicenseeSession;

        protected IDictionary<int, int[]> CurrencyAgentListBySubsidiaryBusiness(IMetaModelSubsidiarySearch metaModel) =>
            SubsidiaryService.IsIgnoredSubsidiarySearch(metaModel.SubsidiarySearch, metaModel.SubsidiaryList, UserSession) ? UserSession.CurrencyAgentList
            : SubsidiaryService.GetCurrencyAgentList(LicenseeSession.LicenseeName, UserSession.CurrencyAgentList, metaModel.SubsidiaryList);

        [System.CLSCompliant(false)]
        protected internal virtual HttpResponseMessage ExcelStream(IWorkbook workbook, string fileName)
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new PushStreamContent(
              (stream, context, transportContext) =>
              {
                  try
                  {
                      workbook.Write(stream);
                  }
                  finally
                  {
                      workbook.Close();
                      workbook = null;
                      stream.Close();
                      context.Dispose();
                  }
              },
              new MediaTypeHeaderValue("application/octet-stream"))
            };
            result.Headers.TransferEncodingChunked = true;
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName
            };
            return result;
        }

        protected override void Initialize(System.Web.Http.Controllers.HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            var currentLanguage = _langService.GetCurrentLanguage();
            _langService.SetPageCulture(currentLanguage);
        }

        protected internal JsonResult<T> JsonApi<T>(T content)
        {
            return Json(content, DefaultJsonSettings);
        }

        protected internal virtual JsonSerializerSettings DefaultJsonSettings { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };
    }
}