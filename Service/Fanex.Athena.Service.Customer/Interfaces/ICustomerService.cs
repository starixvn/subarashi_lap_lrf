namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Customer.DTO;

    public interface ICustomerService
    {
        CustomerInfo GetCustomerInfo(int custId);
    }
}