// -----------------------------------------------------------------------
// <copyright file="IAthorizationDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    public interface IAthorizationDataAccess
    {
        /// <summary>
        /// return tuple<currencyid,agentid>
        /// </summary>
        /// <param name="custId"></param>
        /// <param name="transid"></param>
        /// <returns></returns>
        Tuple<int, int> IsCustomerBelonging(int custId, long transid);
    }
}