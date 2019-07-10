using System;
// --------------------------------------------------------------------------
// <copyright file="BaseApiController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using NPOI.SS.UserModel;
    using ONEbook.UM.Filters;
    using Fanex.Athena.Service.Core.Common.Interfaces;

    [CheckUMFilter]
    [XFrameOptionApi]
    public class BaseApiController : ApiController
    {
        private readonly ILanguageService _langService;
        private readonly IProductService _productService;
        private readonly ISessionService _sessionService;

        protected internal BaseApiController(ISessionService sessionService, IProductService productService, ILanguageService languageService)
        {
            _sessionService = sessionService ?? throw new ArgumentNullException(nameof(sessionService));
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
            _langService = languageService ?? throw new ArgumentNullException(nameof(languageService));
        }

        protected IDictionary<int, string> UserCurrencyList => _sessionService.UserSession.CurrencyList;

        protected IProductService ProductService
        {
            get
            {
                return _productService;
            }
        }

        protected ISessionService SessionService
        {
            get
            {
                return _sessionService;
            }
        }

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

    }
}