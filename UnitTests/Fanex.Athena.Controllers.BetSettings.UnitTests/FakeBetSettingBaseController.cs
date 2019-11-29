namespace Fanex.Athena.Controllers.BetSettings.UnitTests
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.BetSettings.DTO;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Customer.DTO;
    using Service.BetSettings.Interfaces;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    internal class FakeBetSettingBaseController : BetSettingBaseController
    {
        internal FakeBetSettingBaseController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService)
        : base(coreBetSettingService, productService)
        {
        }

        internal new JsonResult AccessDenied()
        {
            return base.AccessDenied();
        }

        internal new CustomerInfo GetCustomerInfo(int custId)
        {
            return base.GetCustomerInfo(custId);
        }

        internal async Task AssignRequiredProperties(BetSettingBaseViewModel viewModel, BetSettingMetaModel metaModel)
        {
            await base.AssignRequiredPropertiesAsync(viewModel, metaModel);
        }

        internal new CommonBetSetting GetBetSettingCommonParam(int userId, int licenseeId, string language)
        {
            return base.GetBetSettingCommonParam(userId, licenseeId, language);
        }

        internal new bool IsBetSettingEditable(UserAuthInfo userSession)
        {
            return base.IsBetSettingEditable(userSession);
        }

        internal new decimal GetDecimalRequest(string name, decimal defaultValue)
        {
            return base.GetDecimalRequest(name, defaultValue);
        }

        internal new int GetIntRequest(string name, int defaultValue)
        {
            return base.GetIntRequest(name, defaultValue);
        }
    }
}