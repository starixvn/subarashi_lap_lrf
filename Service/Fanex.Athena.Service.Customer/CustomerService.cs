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

        public CustomerService(ICustomerDataAccess customerDataAccess)
        {
            _customerDataAccess = customerDataAccess;
        }

        public CustomerInfo GetCustomerInfo(int custId)
        {
            return _customerDataAccess.GetCustomerInfo(custId);
        }
    }
}