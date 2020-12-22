namespace Fanex.Athena.Controllers.Customer
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;

    public class CustomerClassController : CultureBaseController
    {
        private readonly ICustomerClassService _service;

        public CustomerClassController(ICustomerClassService service)
        {
            _service = service;
        }

        public async Task<ViewResult> CustomerClassInformation()
        {
            var model = await _service.GetCustomerClassInformation(new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            });

            return View("~/Views/Desktop/Customer/CustomerClass/CustomerClassInformation.cshtml", model);
        }
    }
}
