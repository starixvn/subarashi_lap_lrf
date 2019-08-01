// -----------------------------------------------------------------------
// <copyright file="CustomerService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccess.Customer.Interfaces;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;


    using Model.Core.ResultModel;

    using Resources;

    public class CustomerListService : ICustomerListService
    {
        private readonly ICustomerDataAccess _customerDataAccess;

        private readonly ICustomerListDataAccess _customerListDataAccess;

        private readonly IDormantCustomerListDataAccess _dormantCustomerListDataAccess;

        private readonly IProductService _productService;

        private readonly IAppSettings _appSettings;
        private readonly ILGAPIClient _lgClient;

        public CustomerListService(
            ICustomerDataAccess customerDataAccess,
            ICustomerListDataAccess customerListDataAccess,
            IDormantCustomerListDataAccess dormantCustomerListDataAccess,
            IProductService productService,
            IAppSettings appSettings, ILGAPIClient lgClient)
        {
            _customerDataAccess = customerDataAccess;
            _customerListDataAccess = customerListDataAccess;
            _dormantCustomerListDataAccess = dormantCustomerListDataAccess;
            _productService = productService;
            _appSettings = appSettings;
            _lgClient = lgClient;
        }

        public async Task<ReportResultModel<CustomerDTO>> GetActiveCustomersAsync(CustomerListMetaModel metaModel)
        {
            return await _customerListDataAccess.GetActiveCustomers(metaModel).ConfigureAwait(false);
        }

        public async Task<ReportResultModel<DormantCustomer>> GetDormantCustomersAsync(CustomerListMetaModel metaModel)
        {
            return await _dormantCustomerListDataAccess.GetDormantCustomers(metaModel).ConfigureAwait(false);
        }

        public LogInfo GetCustomerLoginInfo(int custId, int licenseeId, string siteName)
        {
            return _customerListDataAccess.GetCustomerLoginInfo(custId, licenseeId, siteName);
        }

        #region Update

        public IResultInfo UpdateOddsGroup(CustomerOddsGroupMetaModel metaModel)
        {
            return _customerListDataAccess.UpdateOddsGroup(metaModel);
        }

        public async Task<IResultInfo> UpdateCustClosedAsync(CustomerStatusMetaModel metaModel, string languageCode)
        {
            var customerInfo = _customerDataAccess.GetCustomerInfo(metaModel.CustId);
            var closeCasinoResult = true;
            var productAccess = this._productService.GetProductAccess(metaModel.LicenseeId, languageCode);
            var casinoSupported = productAccess.IsAllowCS;

            if (customerInfo.SyncCasino && casinoSupported)
            {
                if (!_appSettings.IsDisableRngCasino)
                {
                    var casinoMetaModel = new CustomerStatusMetaModel
                    {
                        CustId = metaModel.CustId,
                        LicenseeName = metaModel.LicenseeName.ToUpperInvariant(),
                        IsOn = metaModel.IsOn,
                        ModifyById = metaModel.ModifyById,
                        ModifyByUsername = metaModel.ModifyByUsername,
                        Ip = metaModel.Ip
                    };

                    const string apiPath = "/RNGCasinoCustomer/Closed";

                    var temp = await _lgClient.PostAsync<APIResult<bool>>
                        (apiPath, casinoMetaModel, languageCode).ConfigureAwait(false);
                    closeCasinoResult = temp != null && temp.Data;
                }
                else
                {
                    return new ResultInfo { Code = 1, Message = "RNG Casino Database is not currently available. Please try again later." };
                }
            }

            return closeCasinoResult
                ? _customerListDataAccess.UpdateCustClosed(metaModel)
                : new ResultInfo { Code = 1, Message = "Error when update closed status on casino db" };
        }

        public async Task<IResultInfo> UpdateCustSuspendAsync(CustomerStatusMetaModel metaModel, string languageCode)
        {
            var customerInfo = _customerDataAccess.GetCustomerInfo(metaModel.CustId);
            var suspendCasinoResult = true;
            var productAccess = this._productService.GetProductAccess(metaModel.LicenseeId, languageCode);
            var casinoSupported = productAccess.IsAllowCS;

            if (customerInfo.SyncCasino && casinoSupported)
            {
                if (!_appSettings.IsDisableRngCasino)
                {
                    var casinoMetaModel = new CustomerStatusMetaModel
                    {
                        CustId = metaModel.CustId,
                        LicenseeName = metaModel.LicenseeName.ToUpperInvariant(),
                        IsOn = metaModel.IsOn,
                        ModifyById = metaModel.ModifyById,
                        ModifyByUsername = metaModel.ModifyByUsername,
                        Ip = metaModel.Ip
                    };


                    const string apiPath = "/RNGCasinoCustomer/Suspend";
                    var temp = await _lgClient.PostAsync<APIResult<bool>>
                        (apiPath, casinoMetaModel, languageCode).ConfigureAwait(false);
                    suspendCasinoResult = temp != null && temp.Data;
                }
                else
                {
                    return new ResultInfo { Code = 1, Message = "RNG Casino Database is not currently available. Please try again later." };
                }
            }

            return suspendCasinoResult
                ? _customerListDataAccess.UpdateCustSuspend(metaModel)
                : new ResultInfo { Code = 1, Message = "Error when update suspend status on casino db" };
        }

        public IResultInfo UpdateCustomerBAStatus(
            int licenseeId,
            int custId,
            int modifiedBy,
            bool allowBA,
            Request request)
        {
            return this._customerListDataAccess.UpdateCustomerBAStatus(
                licenseeId,
                   custId,
                   modifiedBy,
                   allowBA,
                   request);
        }

        public IResultInfo UpdateSpecialLevel(int userId, int custId, int level, string ip, string language)
        {
            return _customerListDataAccess.UpdateSpecialLevel(userId, custId, level, ip, language);
        }

        #endregion Update
    }
}