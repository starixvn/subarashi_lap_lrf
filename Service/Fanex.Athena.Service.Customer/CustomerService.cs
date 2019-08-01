namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Interfaces;

    using Model.Customer.DTO;

    public class CustomerService : ICustomerService
    {
        private readonly ICustomerDataAccess _customerDataAccess;

        private readonly IAuthorizationService _authorizationService;

        public CustomerService(ICustomerDataAccess customerDataAccess, IAuthorizationService authorizationService)
        {
            _customerDataAccess = customerDataAccess;
            _authorizationService = authorizationService;
        }

        public CustomerInfo GetCustomerInfo(IDictionary<int, int[]> currencyAgents, int custId)
        {
            return _authorizationService.HasPermissionOnData(currencyAgents, custId, 0)
                ? _customerDataAccess.GetCustomerInfo(custId)
                : new CustomerInfo();
        }
    }
}