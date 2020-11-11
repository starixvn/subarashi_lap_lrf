namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;

    public class CustomerClassService : ICustomerClassService
    {
        private readonly ICustomerClassDataAccess _dataAccess;

        public CustomerClassService(ICustomerClassDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<IEnumerable<CustomerClassModel>> GetCustomerClassInformation(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassModel>();
            var custClasses = new Dictionary<string, CustomerClassModel>();

            var limits = await _dataAccess.GetLimitPolicies(metaModel);
            foreach (var l in limits)
            {
                var id = l.Id;
                if (!custClasses.ContainsKey(id))
                {
                    var c = new CustomerClassModel(id);
                    custClasses[id] = c;
                    result.Add(c);
                }

                custClasses[id].LimitPolicies.Add(l);
            }

            var groups = await _dataAccess.GetGroupPolicies(metaModel);
            foreach (var g in groups)
            {
                var id = g.Id;
                if (!custClasses.ContainsKey(id))
                {
                    var c = new CustomerClassModel(id);
                    custClasses[id] = c;
                    result.Add(c);
                }

                custClasses[id].OddsGroup = string.IsNullOrWhiteSpace(g.OddsGroup) ? "-" : g.OddsGroup;
            }

            return result.OrderBy(r => int.Parse(r.Id));
        }
    }
}
