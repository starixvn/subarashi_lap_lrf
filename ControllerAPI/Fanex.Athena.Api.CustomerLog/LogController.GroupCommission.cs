// --------------------------------------------------------------------------
// <copyright file="LogController.GroupCommission.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.CustomerLog
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel.CustomerLog;
    using Fanex.Athena.Model.Customer.ViewModel.CustomerLog;

    public partial class LogController
    {
        [HttpGet]
        public async Task<dynamic> GroupCommission(int year, int month, int fromday, int today)
        {
            LogHelper.SetTemplateServiceConfiguration();

            var supportedProducts = _productService.GetAllowedProducts("CommissionGroups");
            var productAccess = _productService.GetProductAccess(SessionService.LicenseeSession.LicenseeId, SessionService.UserSession.Language);
            var permissions = CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);
            ActionViewModel.SetProductPermissions(permissions);

            var metaModel = new CustomerLogMetaModel
            {
                Year = year,
                Month = month,
                FromDay = fromday,
                ToDay = today,
                LicenseeId = SessionService.LicenseeSession.LicenseeId,
                SiteName = SessionService.LicenseeSession.LicenseeName
            };

            var cacheKey = $"{CacheKey.MemorycacheCommSettingsByLicensee}_{metaModel.LicenseeId}";
            var commSettings = _cacheService.Get<IEnumerable<GroupCommSettingMetaModel>>(cacheKey);

            if (commSettings == null)
            {
                commSettings = await _groupComService.InitCommValues(productAccess);
                _cacheService.Set(cacheKey, commSettings);
            }

            var dataList = await _customerLogDataAccess.GetGroupCommList(metaModel).ConfigureAwait(false);
            var dataAfterRemoveHTMLTag = RemoveHtmlTag(dataList);
            var details = GetDetails(dataAfterRemoveHTMLTag, commSettings);

            return new { rows = details };
        }
    }
}