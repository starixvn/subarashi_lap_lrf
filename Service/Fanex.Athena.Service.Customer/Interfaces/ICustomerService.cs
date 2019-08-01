namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Customer.DTO;

    public interface ICustomerService
    {
        CustomerInfo GetCustomerInfo(IDictionary<int, int[]> currencyAgents, int custId);
    }
}