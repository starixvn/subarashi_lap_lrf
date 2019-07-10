namespace Fanex.Athena.Api.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Base;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Report.MetaModel;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Core.Utility;

    public class ApiReportBaseController : BaseApiController
    {
        protected ApiReportBaseController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService)
            : base(sessionService, productService, langService)
        {
        }

    }
}