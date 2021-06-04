using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    public interface IAthorizationDataAccess
    {
        Tuple<int, int> IsCustomerBelonging(int custId, long transid);

        Dictionary<int, CustDTO> GetCustInfo(string custIds);

        bool IsProductBelonging(int productId, string licenseeName);
    }
}
