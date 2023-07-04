namespace Fanex.Athena.Api.Base
{
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Excel.Base;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using NPOI.SS.UserModel;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Web.Http;
    using System.Web.Http.Results;
    using System.Web.Mvc;

    [XFrameOptionApi]
    [ApiUMFilter]
    public class BaseApiController : ApiController
    {
        protected virtual JsonSerializerSettings DefaultJsonSettings { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        protected virtual JsonSerializerSettings PascalCassJsonSetting { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new DefaultContractResolver()
        };

        private readonly ILanguageService _langService;

        protected internal BaseApiController(ILanguageService languageService)
        {
            _langService = languageService;
        }

        public IProductService ProductService { get; set; }

        public IAppSettings AppSettingInstance { get; set; }

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

        protected internal JsonNetResult<T> JsonNetResult<T>(T content)
        {
            return JsonNetResult(content, PascalCassJsonSetting );
        }

        protected internal JsonNetResult<T> JsonNetResult<T>(T content, JsonSerializerSettings serializerSettings)
        {
            return JsonNetResult(content, serializerSettings, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false, throwOnInvalidBytes: true));
        }

        protected internal virtual JsonNetResult<T> JsonNetResult<T>(T content, JsonSerializerSettings serializerSettings, Encoding encoding)
        {
            return new JsonNetResult<T>(content, serializerSettings, encoding, this.Request);
        }


        protected internal virtual HttpResponseMessage ZipFileSteam(MemoryStream zipFile, string fileName)
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new PushStreamContent(
              (stream, context, transportContext) =>
              {
                  try
                  {
                      zipFile.WriteTo(stream);
                  }
                  finally
                  {
                      zipFile.Close();
                      zipFile = null;
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

        protected static MemoryStream CreateZipFile<T>(IList<T> excelFiles) where T : ReportBase
        {
            var mem = new MemoryStream();
            using (var zip = new Ionic.Zip.ZipFile())
            {
                for (var i = 0; i < excelFiles.Count; i++)
                {
                    var workbook = excelFiles[i].Workbook;
                    try
                    {
                        using (var stream = new MemoryStream())
                        {
                            workbook.Write(stream);
                            zip.AddEntry($"sheet{i}.xls", stream.ToArray());
                        }
                    }
                    finally
                    {
                        workbook.Close();
                    }
                }

                zip.ParallelDeflateThreshold = -1;
                zip.Save(mem);
            }
            return mem;
        }
    }
}